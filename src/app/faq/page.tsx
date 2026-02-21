import { Metadata } from "next";

export const metadata: Metadata = {
     title: "FAQ | Modernest",
     description: "Frequently asked questions",
};

export default function FAQPage() {
     const faqs = [
          {
               question: "What is your return policy?",
               answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return."
          },
          {
               question: "How long does shipping take?",
               answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for an additional fee and delivers in 2-3 business days."
          },
          {
               question: "Do you offer assembly services?",
               answer: "Yes, we offer professional assembly services for an additional fee. You can select this option during checkout."
          },
          {
               question: "What payment methods do you accept?",
               answer: "We accept all major credit cards, PayPal, and financing options through our payment partners."
          },
          {
               question: "How can I track my order?",
               answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order through your account."
          },
          {
               question: "Do you offer warranties?",
               answer: "Yes, all our furniture comes with a minimum 1-year warranty. Extended warranties are available for purchase."
          },
          {
               question: "Can I cancel or modify my order?",
               answer: "You can cancel or modify your order within 24 hours of placing it. Contact our support team as soon as possible."
          },
          {
               question: "Do you ship internationally?",
               answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
          }
     ];

     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              Find answers to common questions about our products and services
                         </p>
                    </div>
               </section>

               {/* FAQ Section */}
               <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                         <div className="space-y-6">
                              {faqs.map((faq, index) => (
                                   <div key={index} className="bg-neutral rounded-lg p-6">
                                        <h3 className="text-xl font-bold text-brand mb-3">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>

               {/* Contact CTA */}
               <section className="py-16 bg-neutral">
                    <div className="container mx-auto px-4 text-center">
                         <h2 className="text-3xl font-bold text-brand mb-6">
                              Still have questions?
                         </h2>
                         <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                              Can't find the answer you're looking for? Please contact our friendly team.
                         </p>
                         <a
                              href="/contact"
                              className="inline-block bg-accent text-brand font-bold px-8 py-4 hover:bg-brand hover:text-white transition-colors"
                         >
                              Contact Us
                         </a>
                    </div>
               </section>
          </div>
     );
}
