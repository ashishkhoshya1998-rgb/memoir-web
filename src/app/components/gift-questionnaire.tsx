import { useState } from "react";

export function GiftQuestionnaire({
  T,
  tk,
  nv,
  wish,
  toggleWish,
  AP,
  PC,
  onClose,
}: {
  T: any;
  tk: string;
  nv: (p: string, data?: string | null) => void;
  wish: string[];
  toggleWish: (pid: string) => void;
  AP: any[];
  PC: any;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    recipient: "",
    occasion: "",
    style: "",
    budget: "",
  });

  const questions = [
    {
      q: "Who is this gift for?",
      options: [
        { id: "sister", label: "Sister" },
        { id: "partner", label: "Partner" },
        { id: "mother", label: "Mother" },
        { id: "friend", label: "Friend" },
        { id: "self", label: "Myself" },
      ],
      key: "recipient",
    },
    {
      q: "What's the occasion?",
      options: [
        { id: "birthday", label: "Birthday" },
        { id: "anniversary", label: "Anniversary" },
        { id: "rakhi", label: "Rakshabandhan" },
        { id: "achievement", label: "Achievement" },
        { id: "justbecause", label: "Just Because" },
      ],
      key: "occasion",
    },
    {
      q: "What's her style?",
      options: [
        { id: "minimalist", label: "Minimalist" },
        { id: "classic", label: "Classic" },
        { id: "delicate", label: "Delicate" },
        { id: "bold", label: "Bold" },
      ],
      key: "style",
    },
    {
      q: "What's your budget?",
      options: [
        { id: "under3k", label: "Under ₹3,000" },
        { id: "3k-6k", label: "₹3,000 - ₹6,000" },
        { id: "6k-10k", label: "₹6,000 - ₹10,000" },
        { id: "above10k", label: "Above ₹10,000" },
      ],
      key: "budget",
    },
  ];

  const currentQ = questions[step];

  const handleAnswer = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: optionId }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      // Navigate to results after a short delay
      setTimeout(() => {
        const collectionMatch = getCollectionMatch();
        onClose();
        if (collectionMatch) {
          nv("collection", collectionMatch);
        } else {
          nv("collections");
        }
      }, 400);
    }
  };

  const getCollectionMatch = () => {
    if (answers.occasion === "rakhi") return "rakshabandhan";
    if (answers.occasion === "anniversary" || answers.occasion === "birthday") return "romantic";
    if (answers.occasion === "achievement" || answers.occasion === "justbecause") return "newbeginnings";
    if (answers.recipient === "self") return "herself";
    return "";
  };

  const progressPercent = ((step + 1) / questions.length) * 100;

  return (
    <>
      {/* Modal Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          animation: "fadeIn 0.3s ease",
        }}
      />

      {/* Modal Content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(540px, 90vw)",
          maxHeight: "85vh",
          background: T.bg,
          borderRadius: tk === "terra" ? 8 : 0,
          zIndex: 10000,
          animation: "slideUp 0.3s ease",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: T.bgA,
            border: "1px solid " + T.bd,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.ac;
            e.currentTarget.style.borderColor = T.ac;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = T.bgA;
            e.currentTarget.style.borderColor = T.bd;
          }}
        >
          <span style={{ fontSize: 14, color: T.txM }}>×</span>
        </button>

        {/* Progress Bar */}
        <div
          style={{
            height: 2,
            background: T.bd,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: progressPercent + "%",
              background: T.ac,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: "48px 40px 40px",
            maxHeight: "calc(85vh - 2px)",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <span
              style={{
                fontSize: 8,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: T.ac,
                display: "block",
                marginBottom: 12,
              }}
            >
              Gift Finder · Step {step + 1} of {questions.length}
            </span>
            <h2
              style={{
                fontFamily: T.serif,
                fontSize: 22,
                fontWeight: tk === "blanc" ? 400 : 300,
                color: T.hd,
                fontStyle: "italic",
                marginBottom: 6,
              }}
            >
              {currentQ.q}
            </h2>
          </div>

          {/* Options Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 10,
            }}
          >
            {currentQ.options.map((opt) => {
              const selected = answers[currentQ.key as keyof typeof answers] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  style={{
                    position: "relative",
                    padding: "16px 14px",
                    background: selected ? T.ac + "12" : T.bgA,
                    border: "1.5px solid " + (selected ? T.ac : T.bd),
                    borderRadius: tk === "terra" ? 6 : 2,
                    cursor: "pointer",
                    transition: "all 0.25s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = T.ac + "60";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = T.bd;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: selected ? T.ac : T.hd,
                      fontWeight: selected ? 500 : 400,
                      letterSpacing: 0.3,
                      fontFamily: T.sans,
                    }}
                  >
                    {opt.label}
                  </p>
                  {selected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: T.ac,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#fff", fontSize: 10 }}>✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                marginTop: 28,
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid " + T.bd,
                borderRadius: tk === "terra" ? 4 : 2,
                cursor: "pointer",
                fontSize: 9,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: T.txM,
                transition: "all 0.2s",
                display: "block",
                margin: "28px auto 0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.ac;
                e.currentTarget.style.color = T.ac;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.bd;
                e.currentTarget.style.color = T.txM;
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </>
  );
}
