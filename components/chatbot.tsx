"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendContactMails } from "@/lib/contact-email";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { marketingPagesData } from "@/lib/data/service";

type Step = "name" | "email" | "phone" | "services" | "message" | "submitting" | "done";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", sender: "bot", text: "Hi there! 👋 I'm here to help you get started. What's your name?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    message: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text }]);
  };

  const handleSend = async () => {
    const val = inputValue.trim();
    if (!val) return;

    addUserMessage(val);
    setInputValue("");
    handleProcessStep(val);
  };

  const handleProcessStep = (val: string) => {
    switch (step) {
      case "name":
        if (val.length < 2) {
          setTimeout(() => addBotMessage("Please enter a valid name (at least 2 characters)."), 500);
          return;
        }
        setFormData((prev) => ({ ...prev, name: val }));
        setStep("email");
        setTimeout(() => addBotMessage(`Nice to meet you, ${val}! What's your email address?`), 500);
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          setTimeout(() => addBotMessage("That doesn't look like a valid email. Could you try again?"), 500);
          return;
        }
        setFormData((prev) => ({ ...prev, email: val }));
        setStep("phone");
        setTimeout(() => addBotMessage("Great! What's the best phone number to reach you at?"), 500);
        break;
      case "phone":
        if (val.length < 10) {
          setTimeout(() => addBotMessage("Please enter a valid phone number (at least 10 digits)."), 500);
          return;
        }
        setFormData((prev) => ({ ...prev, phone: val }));
        setStep("services");
        setTimeout(() => addBotMessage("Got it. Which services are you interested in?"), 500);
        break;
      case "services":
        setFormData((prev) => ({ ...prev, services: [val] }));
        setStep("message");
        setTimeout(() => addBotMessage("Perfect. Finally, do you have any specific message or details for us?"), 500);
        break;
      case "message":
        const updatedData = { ...formData, message: val };
        setFormData(updatedData);
        setStep("submitting");
        setTimeout(() => {
          addBotMessage("Thanks! Submitting your request now...");
          submitForm(updatedData);
        }, 500);
        break;
      default:
        break;
    }
  };

  const submitForm = async (data: typeof formData) => {
    try {
      await sendContactMails({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        services: data.services,
      });
      setStep("done");
      setTimeout(() => addBotMessage("All set! We've received your request and our team will get back to you shortly. Have a great day!"), 1000);
    } catch (error) {
      console.error(error);
      setStep("done");
      setTimeout(() => addBotMessage("Oops, something went wrong while sending. Please try contacting us directly via the contact page."), 1000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 lg:bottom-5 right-5 z-[9999] h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen ? "bg-[#0b0b0c] hover:bg-[#1a1a1c]" : "bg-gradient-to-r from-[#E7325C] to-[#EF8030] hover:opacity-90"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative w-7 h-7">
            <Image 
              src="/nav_logo.png" 
              alt="Chat" 
              fill 
              className="object-contain filter invert brightness-0" 
            />
          </div>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 lg:bottom-24 right-5 z-[9999] w-[350px] h-[480px] max-h-[85vh] max-w-[calc(100vw-2.5rem)] flex flex-col bg-[#0b0b0c] border border-[rgba(242,239,233,0.1)] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 font-inter">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E7325C] to-[#EF8030] p-4 text-white flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 bg-white/10 rounded-full overflow-hidden flex items-center justify-center p-1.5 border border-white/20">
              <Image 
                src="/nav_logo.png" 
                alt="Bindzo 8" 
                fill 
                className="object-contain p-1" 
              />
            </div>
            <div>
              <h3 className="font-bold text-lg font-[var(--font-fraunces)] tracking-tight leading-tight">Bindzo 8 Assistant</h3>
              <p className="text-xs opacity-90 font-[var(--font-space-grotesk)]">We typically reply in a few hours.</p>
            </div>
          </div>

          {/* Chat Area */}
          <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/[0.02] overscroll-contain">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] font-[var(--font-space-grotesk)] leading-relaxed",
                    msg.sender === "user"
                      ? "bg-[#EF8030] text-white rounded-br-sm"
                      : "bg-[#1a1a1c] text-[#f2efe9] border border-[rgba(242,239,233,0.05)] rounded-bl-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {step === "submitting" && (
              <div className="flex w-full justify-start">
                <div className="bg-[#1a1a1c] border border-[rgba(242,239,233,0.05)] rounded-2xl rounded-bl-sm px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-[#EF8030]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#0b0b0c] border-t border-[rgba(242,239,233,0.05)]">
            {step === "services" ? (
              <div data-lenis-prevent="true" className="flex flex-wrap gap-2 pt-1 pb-2 max-h-[130px] overflow-y-auto pr-1 overscroll-contain">
                {marketingPagesData.map((service) => (
                  <button
                    key={service.slug}
                    onClick={() => {
                      addUserMessage(service.title);
                      handleProcessStep(service.title);
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-[rgba(242,239,233,0.15)] text-[#f2efe9] bg-white/[0.02] hover:bg-[#EF8030] hover:border-[#EF8030] hover:text-white transition-colors"
                  >
                    {service.title}
                  </button>
                ))}
                <button
                  onClick={() => {
                    addUserMessage("Other");
                    handleProcessStep("Other");
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-[rgba(242,239,233,0.15)] text-[#f2efe9] bg-white/[0.02] hover:bg-[#EF8030] hover:border-[#EF8030] hover:text-white transition-colors"
                >
                  Other
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex w-full items-center gap-2"
              >
                <Input
                  ref={inputRef}
                  disabled={step === "submitting" || step === "done"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step === "done" ? "Chat ended" : "Type your answer..."}
                  className="flex-1 bg-white/[0.03] border-[rgba(242,239,233,0.1)] text-[#f2efe9] focus-visible:ring-[#EF8030]/50 placeholder:text-[#8b8985]"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || step === "submitting" || step === "done"}
                  className="bg-[#EF8030] hover:bg-[#E7325C] text-white transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
