import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Privacy Policy | Modernest",
     description: "Our privacy policy",
};

export default function PrivacyPage() {
     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              How we protect and handle your data
                         </p>
                    </div>
               </section>

               {/* Content Section */}
               <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                         <div className="prose prose-lg max-w-none">
                              <h2 className="text-2xl font-bold text-brand mb-4">Introduction</h2>
                              <p className="text-gray-600 mb-6">
                                   At Modernest, we take your privacy seriously. This Privacy Policy explains
                                   how we collect, use, disclose, and safeguard your information when you visit
                                   our website.
                              </p>

                              <h2 className="text-2xl font-bold text-brand mb-4">Information We Collect</h2>
                              <p className="text-gray-600 mb-4">
                                   We may collect personal information that you voluntarily provide to us when you:
                              </p>
                              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                                   <li>Register on the Website</li>
                                   <li>Express an interest in obtaining information about us or our products</li>
                                   <li>Participate in activities on the Website</li>
                                   <li>Contact us</li>
                              </ul>

                              <h2 className="text-2xl font-bold text-brand mb-4">How We Use Your Information</h2>
                              <p className="text-gray-600 mb-6">
                                   We use personal information collected via our Website for a variety of business
                                   purposes described below. We process your personal information for these purposes
                                   in reliance on our legitimate business interests.
                              </p>

                              <h2 className="text-2xl font-bold text-brand mb-4">Sharing Your Information</h2>
                              <p className="text-gray-600 mb-6">
                                   We only share information with your consent, to comply with laws, to provide
                                   you with services, to protect your rights, or to fulfill business obligations.
                              </p>

                              <h2 className="text-2xl font-bold text-brand mb-4">Data Security</h2>
                              <p className="text-gray-600 mb-6">
                                   We have implemented appropriate technical and organizational security measures
                                   designed to protect the security of any personal information we process.
                              </p>

                              <h2 className="text-2xl font-bold text-brand mb-4">Contact Us</h2>
                              <p className="text-gray-600 mb-6">
                                   If you have questions or comments about this policy, you may email us at
                                   privacy@modernest.com.
                              </p>
                         </div>
                    </div>
               </section>
          </div>
     );
}
