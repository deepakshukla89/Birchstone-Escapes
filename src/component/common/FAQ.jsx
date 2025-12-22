import React, { useState } from 'react';
import './FAQ.css';

const FAQ = ({ 
  title = "General Asked Questions",
  faqs = []
}) => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Default FAQs if none provided
  const defaultFaqs = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      question: "Why do we use it?",
      answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
      question: "Where does it come from?",
      answer: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
    },
    {
      question: "Where can I get some?",
      answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    }
  ];

  const faqData = faqs.length > 0 ? faqs : defaultFaqs;

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section 
      className="faq-section" 
      aria-labelledby="faq-title"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema.org JSON-LD */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <span className="faq-label">FAQ</span>
          <h2 className="faq-title" id="faq-title">{title}</h2>
        </div>

        {/* Accordion */}
        <div className="faq-list" role="list">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item-open' : ''} ${index === faqData.length - 1 ? 'faq-item-last' : ''}`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              role="listitem"
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span itemProp="name">{faq.question}</span>
                <span className="faq-arrow" aria-hidden="true">
                  {openIndex === index ? '↑' : '↓'}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className="faq-answer"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                aria-hidden={openIndex !== index}
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
