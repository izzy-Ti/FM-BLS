
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'controller', 'authController.js');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /await transporter\.sendTransacEmail\(mailOption\);\s+res\.json\({ success: true }\)/;

if (regex.test(content)) {
    const replacement = `try {
      await transporter.sendTransacEmail(mailOption);
    } catch (emailError) {
      await user.findByIdAndDelete(newUser._id);
      return res.json({ success: false, message: 'Registration failed: Email service error. Please contact support.' });
    }
    res.json({ success: true })`;

    const newContent = content.replace(regex, replacement);
    fs.writeFileSync(filePath, newContent);
    console.log('File updated successfully');
} else {
    console.log('Target content not found with regex');
    const idx = content.indexOf('transporter.sendTransacEmail');
    console.log('Found at index:', idx);
    if (idx !== -1) {
        console.log('Context:', JSON.stringify(content.substring(idx, idx + 100)));
    }
}
