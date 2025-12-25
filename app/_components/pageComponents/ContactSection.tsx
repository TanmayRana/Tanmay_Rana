"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle, Github, Linkedin, Twitter, Globe, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { postMessage, reset } from "@/lib/storeData/messageSlice";
import { getContact } from "@/lib/storeData/contactSlice";
import { getSocialMedia } from "@/lib/storeData/SocialMediaSlice";
import { toast } from "sonner";

export function ContactSection() {
  const dispatch = useAppDispatch();
  const { loading, success: messageSuccess, error: messageError } = useAppSelector((state) => state.message);
  const contactStore = useAppSelector((state) => state.contact.data?.[0]);
  const socialStore = useAppSelector((state) => state.socialMedia.data?.[0]);

  useEffect(() => {
    if (!contactStore) dispatch(getContact());
    if (!socialStore) dispatch(getSocialMedia());
  }, [dispatch, contactStore, socialStore]);

  const contactData = {
    email: contactStore?.email || "hello@example.com",
    location: contactStore?.location || "India",
    phone: contactStore?.phone || "+91 0000000000",
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: socialStore?.githunurl, color: "hover:text-slate-300" },
    { name: "LinkedIn", icon: Linkedin, url: socialStore?.linkedinurl, color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, url: socialStore?.twitterurl, color: "hover:text-sky-400" },
  ].filter(link => link.url);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const promise = dispatch(postMessage(formData)).unwrap();

    toast.promise(promise, {
      loading: "Sending message...",
      success: () => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => dispatch(reset()), 5000);
        return "Message sent successfully!";
      },
      error: (err) => {
        dispatch(reset());
        return err || "Failed to send message";
      },
    });
  };

  return (
    <section id="contact" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.2) 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 sm:w-[32rem] sm:h-[32rem] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-teal-400 font-medium tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Let's Create Together</h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side - Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email Me", value: contactData.email, href: `mailto:${contactData.email}`, color: "text-blue-400" },
                { icon: MapPin, label: "Location", value: contactData.location, color: "text-purple-400" },
                { icon: Phone, label: "Phone", value: contactData.phone, href: `tel:${contactData.phone.replace(/\s/g, '')}`, color: "text-teal-400" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="group p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/30 transition-all duration-300"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-slate-800/50 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-medium hover:text-teal-400 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
              <h4 className="text-white font-semibold mb-6">Social Networks</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl bg-slate-800/50 text-slate-400 ${social.color} border border-slate-700/50 hover:border-slate-500 transition-all duration-300`}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/50 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">
              {/* Form border animation */}
              <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/10 transition-colors duration-500 pointer-events-none rounded-3xl" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Your Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-teal-500/50 focus:bg-slate-800 text-white placeholder-slate-600 transition-all duration-300 outline-none"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-teal-500/50 focus:bg-slate-800 text-white placeholder-slate-600 transition-all duration-300 outline-none"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="How can I help you?"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-teal-500/50 focus:bg-slate-800 text-white placeholder-slate-600 transition-all duration-300 outline-none"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'subject' ? '100%' : 0 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-teal-500/50 focus:bg-slate-800 text-white placeholder-slate-600 transition-all duration-300 outline-none resize-none"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold hover:shadow-lg hover:shadow-teal-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}