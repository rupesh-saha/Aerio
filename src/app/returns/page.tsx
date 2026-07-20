import { PremiumPageLayout } from "@/components/PremiumPageLayout";

export default function ReturnsPage() {
  return (
    <PremiumPageLayout 
      title="Returns & Exchanges" 
      subtitle="We stand behind our products. If you're not completely satisfied, we make it right."
    >
      <div className="max-w-3xl mt-12 bg-white p-10 md:p-14 rounded-3xl border border-black/5 shadow-sm">
        <div className="prose prose-lg text-brand-graphite/80 leading-relaxed font-light max-w-none">
          <h2 className="text-2xl font-medium text-brand-graphite mb-4">30-Day Risk-Free Trial</h2>
          <p className="mb-8">
            We want you to love your Aerio purifier. Try it in your home for 30 days. If you don't notice a significant difference in your indoor air quality, you can return it for a full refund—no questions asked.
          </p>

          <h2 className="text-2xl font-medium text-brand-graphite mb-4">How to Initiate a Return</h2>
          <ol className="mb-8 space-y-4 list-decimal pl-5">
            <li><strong>Contact Support:</strong> Email our team at support@aerio.com with your order number.</li>
            <li><strong>Print Label:</strong> We will provide a prepaid shipping label via email.</li>
            <li><strong>Package Safely:</strong> Repack the unit in its original packaging (including the box and all inserts).</li>
            <li><strong>Drop Off:</strong> Drop the package off at any authorized FedEx location.</li>
          </ol>

          <h2 className="text-2xl font-medium text-brand-graphite mb-4">Refund Processing</h2>
          <p className="mb-8">
            Once we receive and inspect your returned unit, we will process your refund back to the original payment method. Please allow 5-7 business days for the funds to appear in your account.
          </p>

          <h2 className="text-2xl font-medium text-brand-graphite mb-4">Exceptions</h2>
          <p>
            Please note that replacement filters are final sale and cannot be returned once their original sealed packaging has been opened, for hygiene and safety reasons.
          </p>
        </div>
      </div>
    </PremiumPageLayout>
  );
}
