import { user } from "../models/user.js";
import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodeMailer.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  const { name, email, password, avater, role } = req.body
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing Detail' })
  }
  if (role == 'ADMIN') {
    return res.json({ success: false, message: 'sorry you cant be an admin' })
  }
  try {
    const existedUser = await user.findOne({ email })
    if (existedUser) {
      return res.json({ success: false, message: 'Email already existes' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new user({
      email,
      name,
      password: hashedPassword,
      role
    })
    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.HASH_KEY, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ success: true })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({ success: false, message: 'Missing Detail' })
  }
  try {
    const User = await user.findOne({ email })
    if (!User) {
      return res.json({ success: false, message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, User.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: User._id }, process.env.HASH_KEY, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    const userResponse = {
      _id: User._id,
      name: User.name,
      email: User.email,
      role: User.role,
      IsAccVerified: User.IsAccVerified
    };
    res.json({ success: true, user: userResponse })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    res.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const sendVerifyOTP = async (req, res) => {
  const { userId } = req.body
  try {
    const User = await user.findById(userId)
    if (User.IsAccVerified) {
      return res.json({ success: false, message: 'Account already verified' })
    }
    const OTP = String(Math.floor(100000 + Math.random() * 900000))
    User.verifyOTP = OTP
    User.OTPExpireAt = Date.now() + 24 * 60 * 60 * 1000
    await User.save()
    const mailOption = {
      sender: { email: process.env.EMAIL },
      to: [{ email: User.email }],
      subject: "Account Verification OTP",
      htmlContent: `
<div style="font-family: Arial, sans-serif; background-color: #e8f5e9; padding: 20px;">
  <div style="background: #ffffff; padding: 25px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

    <h2 style="text-align: center; color: #2e7d32;">Account Verification</h2>
    <p style="text-align: center; color: #4e6e52; font-size: 15px;">
      Use the OTP below to verify your account.
    </p>

    <div style="background: #f1f8f5; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center; border: 1px solid #c8e6c9;">
      <p style="font-size: 28px; letter-spacing: 4px; color: #1b5e20; font-weight: bold; margin: 0;">
        ${OTP}
      </p>
    </div>

    <p style="color: #6d8f72; font-size: 14px; margin-top: 20px;">
      This OTP is valid for only a short time. If you did not request this, please ignore this email.
    </p>

    <p style="text-align: center; color: #8aa892; margin-top: 30px; font-size: 13px;">
      © ${new Date().getFullYear()} FM_BLS — All Rights Reserved.
    </p>

  </div>
</div>
`

    };

    await transporter.sendTransacEmail(mailOption);

    res.json({ success: true, message: 'Verification OTP sent' })

  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const verifyOTP = async (req, res) => {
  const { otp, userId } = req.body
  if (!userId || !otp) {
    return res.json({ success: false, message: 'Missing details' })
  }
  try {
    const User = await user.findById(userId)
    if (!User) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (User.verifyOTP === '' || User.verifyOTP !== otp) {
      return res.json({ success: false, message: 'Verification faild' })
    }
    if (User.OTPExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' })
    }
    User.IsAccVerified = true;
    User.verifyOTP = '';
    User.OTPExpireAt = 0;
    await User.save()

    const { name, email } = User;

    const mailOption = {
      sender: { email: process.env.EMAIL },
      to: [{ email: email }],
      subject: "Welcome to FM_BLS!",
      htmlContent: `
<div style="font-family: Arial, sans-serif; background-color: #e8f5e9; padding: 20px;">
  <div style="background: #ffffff; padding: 25px; border-radius: 10px; max-width: 650px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

    <div style="text-align: center;">
      <h1 style="color: #2e7d32;">Welcome to FM_BLS, ${name}!</h1>
      <p style="font-size: 16px; color: #4e6e52;">Your Bible learning journey starts here!</p>
    </div>

    <div style="background-color: #f1f8f5; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #c8e6c9;">
      <p style="font-size: 18px; color: #2e7d32; font-weight: 600;">Your account has been created with the following details:</p>

      <table style="width: 100%; margin-top: 10px; color: #2e2e2e;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
      </table>

      <p style="font-size: 16px; margin-top: 20px; color: #4e6e52;">
        To get the best out of FM_BLS, complete your profile by setting your Bible study preferences and joining a family group.
      </p>

      <div style="text-align: center; margin-top: 25px;">
        <a href="https://fm-bls.astu.edu/profile"
           style="background-color: #66bb6a; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 6px; font-weight: bold;">
           Complete Your Profile
        </a>
      </div>
    </div>

    <p style="text-align: center; color: #6d8f72; margin-top: 30px;">
      Need help? <a href="mailto:support@fm-bls.astu.edu" style="color: #2e7d32;">Contact us</a>.
    </p>

    <p style="text-align: center; font-size: 13px; color: #8aa892; margin-top: 5px;">
      &copy; ${new Date().getFullYear()} FM_BLS by Fellowship of ASTU — All Rights Reserved
    </p>

  </div>
</div>
`

    };

    await transporter.sendTransacEmail(mailOption);
    res.json({ success: true, message: 'Verification OTP verified successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const isAuth = async (req, res) => {
  try {
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const sendResetOTP = async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.json({ success: false, message: 'Missing details' })
  }
  try {
    const User = await user.findOne({ email })
    if (!User) {
      return res.json({ success: false, message: 'User not found' })
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000))
    User.ResetOTP = OTP
    User.ResetOTPExpireAt = Date.now() + 15 * 60 * 1000
    await User.save()
    const mailOption = {
      sender: { email: process.env.EMAIL },
      to: [{ email: User.email }],
      subject: "Password Reset OTP",
      htmlContent: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="background: #ffffff; padding: 25px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

      <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
      <p style="text-align: center; color: #555; font-size: 15px;">
        Use the OTP below to reset your password.
      </p>

      <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
        <p style="font-size: 24px; letter-spacing: 3px; color: #222; font-weight: bold;">
          ${OTP}
        </p>
      </div>

      <p style="color: #666; font-size: 14px; margin-top: 20px;">
        This OTP is valid for a limited time. If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <p style="text-align: center; color: #aaa; margin-top: 30px; font-size: 13px;">
        © ${new Date().getFullYear()} FM_BLS — All Rights Reserved.
      </p>

    </div>
  </div>
  `
    };

    await transporter.sendTransacEmail(mailOption);

    res.json({ success: true, message: 'OTP sent to your email' })

  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body
  if (!email || !otp || !newPassword) {
    res.json({ success: false, message: 'Missing details' })
  }
  try {
    const User = await user.findOne({ email })
    if (!User) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (User.ResetOTP == '' || User.ResetOTP !== otp) {
      return res.json({ success: false, message: 'Invalid OTP number' })
    }
    if (User.ResetOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP is Expired' })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    User.password = hashedPassword;
    User.ResetOTP = '';
    User.ResetOTPExpireAt = 0;
    await User.save();
    return res.json({ success: true, message: 'Password has been reseted successfully' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body
    const User = await user.findById(userId)
    if (!User) {
      return res.json({ success: false, message: 'User not found' })
    }
    return res.json({
      success: true,
      User
    })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const updateProfile = async (req, res) => {
  const { userId, name, avater } = req.body;
  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (avater) updateData.avater = avater;
    await user.findByIdAndUpdate(userId, updateData);
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.json({ success: false, message: "Missing token" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let User = await user.findOne({ email });


    if (!User) {
      User = new user({
        name,
        email,
        avater: picture,
        googleId: sub,
        authType: "google",
        IsAccVerified: true
      });
      await User.save();

      const mailOption = {
        sender: { email: process.env.EMAIL },
        to: [{ email: User.email }],
        subject: "Welcome to FMBLS!",
        htmlContent: `
        <div style="font-family: Arial, sans-serif; background-color: #e8f5e9; padding: 20px;">
          <div style="background: #ffffff; padding: 25px; border-radius: 10px; max-width: 650px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

            <div style="text-align: center;">
              <h1 style="color: #2e7d32;">Welcome to FMBLS, ${User.name}!</h1>
              <p style="font-size: 16px; color: #4e6e52;">You’ve successfully signed in with Google.</p>
            </div>

            <div style="background-color: #f1f8f5; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #c8e6c9;">
              <p style="font-size: 18px; color: #2e7d32; font-weight: 600;">Your account has been created.</p>

              <table style="width: 100%; margin-top: 10px; color: #2e2e2e;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Name:</td>
                  <td style="padding: 8px;">${User.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Email:</td>
                  <td style="padding: 8px;">${User.email}</td>
                </tr>
              </table>

              <p style="font-size: 16px; margin-top: 20px; color: #4e6e52;">
                You can now start learning, track your streaks, and join family groups to grow together.
              </p>

              <div style="text-align: center; margin-top: 25px;">
                <a href="https://fm-bls.astu.edu/profile"
                  style="background-color: #66bb6a; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 6px; font-weight: bold;">
                  Complete Your Profile
                </a>
              </div>
            </div>

            <p style="text-align: center; color: #6d8f72; margin-top: 30px;">
              Need help? <a href="mailto:support@fm-bls.astu.edu" style="color: #2e7d32;">Contact us</a>.
            </p>

            <p style="text-align: center; font-size: 13px; color: #8aa892; margin-top: 5px;">
              &copy; ${new Date().getFullYear()} FMBLS — All Rights Reserved
            </p>

          </div>
        </div>
        `
      };

      await transporter.sendTransacEmail(mailOption);

    }

    if (!User.IsAccVerified) {
      User.name = name;
      User.avater = picture;
      User.googleId = sub;
      User.IsAccVerified = true;
      User.authType = "google";
      await User.save();
    }

    const jwtToken = jwt.sign({ id: User._id }, process.env.HASH_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: User });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};