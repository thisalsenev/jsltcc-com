import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      nameEnglish,
      nationality,
      dob,
      schoolOrCompany,
      homeAddress,
      telephone,
      mobile,
      email,
      testLevel,
      examDate,
      writingHand,
      passportOrId,
    } = body;

    const levelMap: Record<string, string> = {
      basic:  "Basic (Beginner)",
      junior: "Junior (Intermediate)",
      senior: "Senior (Advanced)",
    };

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <div style="background: #0f172a; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New TOPJ Exam Application</h1>
          <p style="color: #94a3b8; margin: 6px 0 0; font-size: 14px;">Submitted via jsltcc.com</p>
        </div>
        <div style="background: white; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; font-size: 15px; margin: 0 0 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 40%;">Full Name (English)</td><td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${nameEnglish}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Nationality</td><td style="padding: 6px 0; color: #0f172a;">${nationality}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Date of Birth</td><td style="padding: 6px 0; color: #0f172a;">${dob}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">School / Company</td><td style="padding: 6px 0; color: #0f172a;">${schoolOrCompany}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Home Address</td><td style="padding: 6px 0; color: #0f172a;">${homeAddress}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Passport / NIC</td><td style="padding: 6px 0; color: #0f172a;">${passportOrId}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Writing Hand</td><td style="padding: 6px 0; color: #0f172a; text-transform: capitalize;">${writingHand}</td></tr>
          </table>
        </div>
        <div style="background: white; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; font-size: 15px; margin: 0 0 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 40%;">Telephone</td><td style="padding: 6px 0; color: #0f172a;">${telephone || "—"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Mobile</td><td style="padding: 6px 0; color: #0f172a;">${mobile}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0; color: #0f172a;">${email}</td></tr>
          </table>
        </div>
        <div style="background: #c0392b; border-radius: 8px; padding: 20px 24px; border: 1px solid #e2e8f0;">
          <h2 style="color: white; font-size: 15px; margin: 0 0 16px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 8px;">Exam Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.7); width: 40%;">Test Level</td><td style="padding: 6px 0; color: white; font-weight: bold;">${levelMap[testLevel] ?? testLevel}</td></tr>
            <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.7);">Exam Date</td><td style="padding: 6px 0; color: white; font-weight: bold;">${examDate}</td></tr>
          </table>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
          JSLTCC — Japan Sri Lanka Technology &amp; Cultural Centre · jsltcc.com
        </p>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">

        <!-- Header -->
        <div style="background: #0f172a; padding: 24px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
          <h1 style="color: white; margin: 0 0 6px; font-size: 22px; letter-spacing: 0.5px;">Application Received</h1>
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">Japan Sri Lanka Technology &amp; Cultural Centre</p>
        </div>

        <!-- Greeting -->
        <div style="background: white; border-radius: 8px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
          <p style="color: #0f172a; font-size: 15px; margin: 0 0 12px;">Dear <strong>${nameEnglish}</strong>,</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 12px;">
            Thank you for submitting your application for the <strong>Test of Proficiency in Japanese (TOPJ)</strong> examination. We are pleased to confirm that your application has been successfully received and is currently under review.
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0;">
            A member of our team will be in touch with you shortly regarding your registration, payment details, and any further steps required to confirm your seat.
          </p>
        </div>

        <!-- Application Summary -->
        <div style="background: white; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; font-size: 15px; margin: 0 0 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Your Application Summary</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 7px 0; color: #64748b; width: 45%;">Full Name</td><td style="padding: 7px 0; color: #0f172a; font-weight: bold;">${nameEnglish}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 7px 6px; color: #64748b;">Date of Birth</td><td style="padding: 7px 6px; color: #0f172a;">${dob}</td></tr>
            <tr><td style="padding: 7px 0; color: #64748b;">School / Company</td><td style="padding: 7px 0; color: #0f172a;">${schoolOrCompany}</td></tr>
            <tr style="background: #f8fafc;"><td style="padding: 7px 6px; color: #64748b;">Mobile</td><td style="padding: 7px 6px; color: #0f172a;">${mobile}</td></tr>
            <tr><td style="padding: 7px 0; color: #64748b;">Email</td><td style="padding: 7px 0; color: #0f172a;">${email}</td></tr>
          </table>
        </div>

        <!-- Exam Details -->
        <div style="background: #c0392b; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px;">
          <h2 style="color: white; font-size: 15px; margin: 0 0 16px; border-bottom: 2px solid rgba(255,255,255,0.25); padding-bottom: 8px;">Exam Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 7px 0; color: rgba(255,255,255,0.75); width: 45%;">Test Level</td><td style="padding: 7px 0; color: white; font-weight: bold;">${levelMap[testLevel] ?? testLevel}</td></tr>
            <tr><td style="padding: 7px 0; color: rgba(255,255,255,0.75);">Exam Date</td><td style="padding: 7px 0; color: white; font-weight: bold;">${examDate}</td></tr>
            <tr><td style="padding: 7px 0; color: rgba(255,255,255,0.75);">Writing Hand</td><td style="padding: 7px 0; color: white; text-transform: capitalize;">${writingHand}</td></tr>
          </table>
        </div>

        <!-- Changes notice (EN + SI) -->
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px;">
          <p style="color: #92400e; font-size: 14px; font-weight: bold; margin: 0 0 6px;">⚠ Need to make changes?</p>
          <p style="color: #78350f; font-size: 13px; line-height: 1.7; margin: 0 0 16px;">
            If you need to update or correct any information in your application, please contact us directly as soon as possible. Changes cannot be made through the website once submitted.
          </p>
          <p style="color: #1e3a5f; font-size: 13px; font-weight: 600; margin: 0 0 4px; border-top: 1px solid #fde68a; padding-top: 14px;">
            📧 japanlanka67@gmail.com &nbsp;|&nbsp; 📞 +94 777 226 726
          </p>

          <!-- Sinhala translation -->
          <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid #fde68a;">
            <p style="color: #92400e; font-size: 13px; font-weight: bold; margin: 0 0 6px;">⚠ වෙනස්කම් කළ යුතුද?</p>
            <p style="color: #78350f; font-size: 13px; line-height: 1.8; margin: 0;">
              ඔබගේ අයදුම්පත්‍රයේ කිසියම් තොරතුරක් යාවත්කාලීන කිරීමට හෝ නිවැරදි කිරීමට අවශ්‍ය නම්, හැකි ඉක්මනින් අපව සෘජුවම අමතන්න. ඉදිරිපත් කළ පසු වෙබ් අඩවිය හරහා වෙනස්කම් කළ නොහැක.
            </p>
            <p style="color: #1e3a5f; font-size: 13px; font-weight: 600; margin: 10px 0 0;">
              📧 japanlanka67@gmail.com &nbsp;|&nbsp; 📞 +94 777 226 726
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 8px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0 0 4px;">
            This is an automated confirmation from JSLTCC. Please do not reply to this email.
          </p>
          <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
            Japan Sri Lanka Technology &amp; Cultural Centre &nbsp;·&nbsp; <a href="https://jsltcc.com" style="color: #c0392b; text-decoration: none;">jsltcc.com</a>
          </p>
        </div>

      </div>
    `;

    // Send to admin
    const adminResult = await resend.emails.send({
      from:    "TOPJ Applications <noreply@jsltcc.com>",
      to:      "japanlanka67@gmail.com",
      subject: `New TOPJ Application — ${nameEnglish} (${levelMap[testLevel] ?? testLevel})`,
      html:    adminHtml,
    });

    if (adminResult.error) {
      console.error("Resend error (admin):", adminResult.error);
      return NextResponse.json({ error: adminResult.error.message }, { status: 500 });
    }

    // Send confirmation to applicant
    await resend.emails.send({
      from:    "JSLTCC <noreply@jsltcc.com>",
      to:      email,
      subject: `TOPJ Application Confirmed — ${levelMap[testLevel] ?? testLevel} | ${examDate}`,
      html:    confirmationHtml,
    });

    return NextResponse.json({ success: true, id: adminResult.data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
