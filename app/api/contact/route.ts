import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials are not set in environment variables.");
      return NextResponse.json(
        { error: "Erreur de configuration du serveur SMTP" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP connection successful");


    await transporter.sendMail({
      from: `"Groupe L'agence — Site Web" <${process.env.SMTP_USER}>`,
      to: `${process.env.CONTACT_EMAIL}, ${process.env.CONTACT_EMAIL2}`,
      replyTo: email,
      subject: `Nouvelle Message de contact de ${name} via le site web`,
      text: `
Nouvelle demande via le site web.

Nom : ${name}
Email : ${email}
Téléphone : ${phone || "—"}

Message :
${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Poppins, sans-serif; background: #f5f5f5; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 4px; overflow: hidden;">
    <div style="background: #01303D; padding: 24px 32px;">
      <h1 style="color: #fff; font-size: 20px; margin: 0; letter-spacing: 1px;">
        Groupe L'agence
      </h1>
      <p style="color: #fff; font-size: 11px; margin: 4px 0 0; letter-spacing: 2px; text-transform: uppercase;">
        Nouvelle demande de contact
      </p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px; width: 140px;">Nom</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600;">${name}</td>
        </tr>
        
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}" style="color: #01303D;">${email}</a></td>
        </tr>
        ${phone ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Téléphone</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${phone}</td>
        </tr>` : ""}
       
      </table>
      <div style="margin-top: 24px;">
        <p style="color: #666; font-size: 13px; margin-bottom: 8px;">Message :</p>
        <div style="background: #f8f8f8; border-radius: 4px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
      </div>
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #eee;">
        <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #01303D; color: #fff; text-decoration: none; border-radius: 3px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
          Répondre à ${name}
        </a>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
