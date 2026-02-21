import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Contact Us | Modernest",
     description: "Get in touch with our team",
};

export default function ContactPage() {
     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              We'd love to hear from you. Our team is here to help.
                         </p>
                    </div>
               </section>

               {/* Contact Info & Form */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                              {/* Contact Information */}
                              <div>
                                   <h2 className="text-3xl font-bold text-brand mb-6">Get in Touch</h2>
                                   <p className="text-gray-600 mb-8">
                                        Have a question about our products? Need help with an order?
                                        We're here to help. Fill out the form or reach out directly.
                                   </p>

                                   <div className="space-y-6">
                                        <div>
                                             <h3 className="font-bold text-brand mb-2">Email</h3>
                                             <p className="text-gray-600">hello@modernest.com</p>
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-brand mb-2">Phone</h3>
                                             <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-brand mb-2">Address</h3>
                                             <p className="text-gray-600">
                                                  123 Furniture Lane<br />
                                                  Design District<br />
                                                  New York, NY 10001
                                             </p>
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-brand mb-2">Hours</h3>
                                             <p className="text-gray-600">
                                                  Monday - Friday: 9am - 6pm<br />
                                                  Saturday: 10am - 4pm<br />
                                                  Sunday: Closed
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              {/* Contact Form */}
                              <div className="bg-neutral p-8 rounded-lg">
                                   <form className="space-y-6">
                                        <div>
                                             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Name
                                             </label>
                                             <input
                                                  type="text"
                                                  id="name"
                                                  name="name"
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                                  placeholder="Your name"
                                             />
                                        </div>

                                        <div>
                                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Email
                                             </label>
                                             <input
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                                  placeholder="your@email.com"
                                             />
                                        </div>

                                        <div>
                                             <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Subject
                                             </label>
                                             <input
                                                  type="text"
                                                  id="subject"
                                                  name="subject"
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                                  placeholder="How can we help?"
                                             />
                                        </div>

                                        <div>
                                             <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Message
                                             </label>
                                             <textarea
                                                  id="message"
                                                  name="message"
                                                  rows={5}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                                                  placeholder="Your message..."
                                             ></textarea>
                                        </div>

                                        <button
                                             type="submit"
                                             className="w-full bg-brand text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-light transition-colors"
                                        >
                                             Send Message
                                        </button>
                                   </form>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     );
}
