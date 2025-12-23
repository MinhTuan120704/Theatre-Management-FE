// Component hiển thị thanh tiến trình với 3 bước: Thông tin khách hàng, Thanh toán, Thông tin vé phim
interface ProgressStepperProps {
  currentStep: number;
}

const ProgressStepper = ({ currentStep }: ProgressStepperProps) => {
  const steps = [
    { number: 1, title: "THÔNG TIN KHÁCH HÀNG" },
    { number: 2, title: "THANH TOÁN" },
    { number: 3, title: "THÔNG TIN VÉ PHIM" },
  ];

  return (
    <div className="flex items-center mb-8 gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step indicator */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                currentStep >= step.number
                  ? "bg-brand-yellow-light text-bg-dark"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`mt-2 text-sm font-semibold transition-colors ${
                currentStep >= step.number
                  ? "text-brand-yellow-light"
                  : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-4 transition-colors ${
                currentStep > step.number
                  ? "bg-brand-yellow-light"
                  : "bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
