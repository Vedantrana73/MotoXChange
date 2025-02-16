export const generateOtpEmailTemplate = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; align-items: center; justify-content: center; padding-bottom: 15px;">
                <img src="https://res.cloudinary.com/dv4lnqsm5/image/upload/v1739280129/logo_u1cfrr.png" alt="MotoXChange Logo" width="80" style="margin-right: 10px;">
                <h2 style="margin: 0; font-size: 22px; color: #333;"><strong>MotoXChange</strong></h2>
            </div>
            
            <h3 style="text-align: center; color: #007bff;">Hello, New User!</h3>
            <p style="text-align: center; font-size: 16px; color: #555;">
                Use the OTP below to verify your email:
            </p>
            
            <div style="display: flex; justify-content: center; padding: 10px 0;">
                <span style="font-size: 22px; font-weight: bold; padding: 10px 20px; border: 2px dashed #007bff; border-radius: 5px; background-color: #f9f9f9; letter-spacing: 5px;">
                    ${otp}
                </span>
            </div>

            <p style="text-align: center; font-size: 14px; color: #777;">
                This OTP is valid for 5 minutes. Do not share it with anyone.
            </p>

            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #777;">
                Best Regards,<br>
                <strong>MotoXChange Team</strong>
            </p>
        </div>
    `;
};

export const generateWelcomeEmailTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; align-items: center; justify-content: center; padding-bottom: 15px;">
                <img src="https://res.cloudinary.com/dv4lnqsm5/image/upload/v1739280129/logo_u1cfrr.png" alt="MotoXChange Logo" width="60" style="margin-right: 10px;">
                <h2 style="margin: 0; font-size: 22px; color: #333;"><strong>MotoXChange</strong></h2>
            </div>
            
            <h3 style="text-align: center; color: #007bff;">Welcome, ${name}!</h3>
            <p style="text-align: center; font-size: 16px; color: #555;">
                We’re excited to have you on board. MotoXChange is your go-to platform for buying and selling second-hand vehicles with ease.
            </p>

            <p style="text-align: center; font-size: 16px; color: #555;">
                Whether you're looking to sell your old vehicle or find a great deal on a used one, we've got you covered!
            </p>

            <div style="text-align: center; margin-top: 20px;">
                <a href="http://localhost:5173" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Explore MotoXChange
                </a>
            </div>

            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #777;">
                If you have any questions, feel free to reach out to our support team.
            </p>

            <p style="text-align: center; font-size: 14px; color: #777;">
                Best Regards,<br>
                <strong>MotoXChange Team</strong>
            </p>
        </div>
    `;
};