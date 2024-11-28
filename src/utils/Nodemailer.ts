import * as nodemailer from "nodemailer";
import * as Sendgrid from "nodemailer-sendgrid-transport";

export class Nodemailer {
  private static initializeTransport() {
    return nodemailer.createTransport(
      Sendgrid({
        auth: {
          api_key: "SG.MSIBOHruTe2t-",
        },
      })
    );
  }

  static sendEmail(data: { to: [string]; subject: string; html: string }):Promise<any> {
   return Nodemailer.initializeTransport().sendMail({
      from: "dinesh.gaur@aaneel.com",
      to: data.to,
      subject: data.subject,
      html:data.html,
    });
  }
}