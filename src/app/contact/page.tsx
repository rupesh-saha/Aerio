import { PremiumPageLayout } from "@/components/PremiumPageLayout";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <PremiumPageLayout 
      title="Contact Us" 
      subtitle="Whether you have a question about your order, need technical support, or just want to say hello, we're here to help."
    >
      <div className="grid lg:grid-cols-12 gap-16 mt-12 items-start">
        
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-brand-graphite mb-2">Live Chat</h3>
              <p className="text-brand-graphite/70 text-sm mb-4">Chat with our support team in real-time. Available Mon-Fri, 9am-5pm EST.</p>
              <button className="text-brand-teal font-medium hover:underline">Start a Chat</button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-brand-graphite mb-2">Email Support</h3>
              <p className="text-brand-graphite/70 text-sm mb-4">Send us an email and we'll get back to you within 24 hours.</p>
              <a href="mailto:support@aerio.com" className="text-brand-teal font-medium hover:underline">support@aerio.com</a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-brand-graphite mb-2">Phone</h3>
              <p className="text-brand-graphite/70 text-sm mb-4">Call us directly. Available Mon-Fri, 9am-5pm EST.</p>
              <a href="tel:18005550199" className="text-brand-teal font-medium hover:underline">1 (800) 555-0199</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 shadow-md">
          <h2 className="text-2xl font-medium text-brand-graphite mb-8">Send a Message</h2>
          <form className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-medium text-brand-graphite/70">First Name</label>
                <input type="text" id="firstName" className="px-5 py-4 rounded-xl bg-brand-sand-light border-none outline-none focus:ring-2 focus:ring-brand-teal/50 transition-shadow" placeholder="Jane" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-medium text-brand-graphite/70">Last Name</label>
                <input type="text" id="lastName" className="px-5 py-4 rounded-xl bg-brand-sand-light border-none outline-none focus:ring-2 focus:ring-brand-teal/50 transition-shadow" placeholder="Doe" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-brand-graphite/70">Email Address</label>
              <input type="email" id="email" className="px-5 py-4 rounded-xl bg-brand-sand-light border-none outline-none focus:ring-2 focus:ring-brand-teal/50 transition-shadow" placeholder="jane@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-brand-graphite/70">Message</label>
              <textarea id="message" rows={5} className="px-5 py-4 rounded-xl bg-brand-sand-light border-none outline-none focus:ring-2 focus:ring-brand-teal/50 transition-shadow resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="mt-4 w-full py-4 bg-brand-graphite text-white rounded-full font-medium hover:bg-black transition-colors">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </PremiumPageLayout>
  );
}
