import { createTransport } from "nodemailer";
import pkg from "handlebars";
const { compile } = pkg;
import { readFileSync } from "fs";
import { join } from "path";

const sendEmail = async (email, subject, payload, template) => {

        // create reusable transporter object using the default SMTP transport
        const transporter = createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
            },
        });
        const { pathname: root } = new URL("../"+template, import.meta.url)
        const source = readFileSync(root.substring(1), "utf8");
        const compiledTemplate = compile(source);
        const options = () => {
            return {
                from: process.env.FROM_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        // Send email
        return new Promise((resolve,reject)=>{
            transporter.sendMail(options(), (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('OK');
                }
            });
        })  
    
};

export default sendEmail;