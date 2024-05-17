"use client";

import React, { useEffect, useState } from "react";

export default function ReturnsSection() {
  const [totalAccumulated, setAmountAccumulated] = useState("");
  const [amount, setAmount] = useState(100000);
  const [howoften, setHowoften] = useState("weekly");
  const [howlong, setHowlong] = useState(36);
  const [amountGain, setAmountGain] = useState("");
  const [bankGain, setBankGain] = useState("");
  const annualInterestRate = 0.1;
  const bankInterestRate = 0.06;

  const handleAmoutEntred = (e: any) => {
    setAmount(e.target.value);
  };

  const handleHowOften = (e: any) => {
    setHowoften(e.target.value);
  };

  const handleHowLong = (e: any) => {
    setHowlong(e.target.value);
  };

  const formatNumberWithCommas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotalAmount = () => {
    const n =
      howoften === "yearly"
        ? 1
        : howoften === "monthly"
        ? 12
        : howoften === "weekly"
        ? 52
        : howoften === "dayly"
        ? 365
        : 1; // Default to yearly

    const years = howlong / 12;

    const netAmount = amount * (n * years);

    const futureValue =
      amount * Math.pow(1 + annualInterestRate / n, n * years);

    const recieveAmount = netAmount + futureValue;

    const bankValue = amount * Math.pow(1 + bankInterestRate / n, n * years);
    const gain = futureValue - amount;
    setAmountGain(formatNumberWithCommas(gain.toFixed(2).toString()));
    const bankGain = bankValue - amount;
    setBankGain(formatNumberWithCommas(bankGain.toFixed(2).toString()));
    return formatNumberWithCommas(recieveAmount.toFixed(2)); // Limiting the decimals to 2 for display
  };

  useEffect(() => {
    setAmountAccumulated(calculateTotalAmount());
  }, [amount, howlong, howoften, amountGain, bankGain]);

  return (
    <section className="min-h-screen bg-[url(/return-pattern.svg)] bg-no-repeat bg-[0_0] flex flex-col items-center justify-center">
      <div className="relative max-w-[1380px] w-full mx-auto my-0 px-5 py-0">
        <div>
          <h2 className="text-[3rem] tracking-[-1px] text-center leading-tight font-semibold mb-[.7em] return-h2">
            Gardez le cap, récoltez les fruits
          </h2>
          <div className="flex flex-col items-center justify-center">
            <h6 className="text-[#6c82a3] text-2xl text-center font-normal return-h6">
              Si vous avez investi
            </h6>
            <div className="flex items-center justify-center max-w-[730px] text-[#082552] mx-auto my-0">
              <sup className="text-[3em] text-inherit leading-[0] relative align-baseline top-[-0.5em] mr-[5px] max-[600px]:hidden">
                f
              </sup>
              <input
                type="tel"
                inputMode="decimal"
                value={formatNumberWithCommas(amount.toString())}
                onChange={handleAmoutEntred}
                name="amount"
                className="w-[494px] outline-none text-center text-[120px] text-inherit tracking-[-0.045em] bg-transparent px-0 py-2.5 border-[none] tabular-nums return-input max-[600px]:w-full"
              ></input>
            </div>
            <div className="flex items-center justify-center gap-5 max-[600px]:mb-7">
              <div className="relative flex items-center">
                <select
                  value={howoften}
                  onChange={handleHowOften}
                  className="appearance-none block cursor-pointer text-[#207cf4] bg-transparent text-lg px-1 py-2.5 border-[none] outline-none"
                >
                  <option value="yearly">Une fois</option>
                  <option value="dayly">Journalier</option>
                  <option selected value="weekly">
                    Hebdomadaire
                  </option>
                  <option value="monthly">Mensuelle</option>
                </select>
                <div className="pointer-events-none relative max-[600px]:hidden">
                  <svg
                    width="13"
                    height="7"
                    viewBox="0 0 13 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    svg-inline=""
                    role="presentation"
                    focusable="false"
                    tabIndex={-1}
                  >
                    <path
                      d="M5.745 6.365L.5 1.055 1.565 0 6.28 4.77 10.995 0l1.065 1.055-5.245 5.31h-1.07z"
                      fill="#0067F5"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative flex items-center">
                <select
                  value={howlong}
                  onChange={handleHowLong}
                  className="appearance-none block cursor-pointer text-[#207cf4] bg-transparent text-lg px-1 py-2.5 border-[none] outline-none"
                >
                  <option value={12}>1 an</option>
                  <option selected value={36}>
                    3 ans
                  </option>
                  <option value={60}>5 ans</option>
                </select>
                <div className="pointer-events-none relative max-[600px]:hidden ">
                  <svg
                    width="13"
                    height="7"
                    viewBox="0 0 13 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    svg-inline=""
                    role="presentation"
                    focusable="false"
                    tabIndex={-1}
                  >
                    <path
                      d="M5.745 6.365L.5 1.055 1.565 0 6.28 4.77 10.995 0l1.065 1.055-5.245 5.31h-1.07z"
                      fill="#0067F5"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="return-result">
              <h2 className="text-[#6c82a3] text-2xl text-center font-normal">
                <p className="text-center text-[#6c82a3] flex items-center justify-center">
                  <sup className="text-[3em] text-inherit leading-[0] relative align-baseline top-[-0.5em] mr-[5px] max-[768px]:hidden">
                    f
                  </sup>
                  <span className="text-[120px] text-[#6c82a3] font-light tracking-[-0.045em] tabular-nums return-input">
                    {totalAccumulated}
                  </span>
                </p>
              </h2>
              <div className="flex flex-col items-center justify-center mt-[-30px]">
                <div className="bg-[#e1f6ff] font-medium text-sm text-[#0066f5] mt-6 px-4 py-2 rounded-[3px]">
                  {amountGain}f gagné en retours sur Epargne
                </div>
                <p className="text-sm text-[#6c82a3]">
                  *Dans une banque, tu gagnerais{" "}
                  <span className="text-[inherit] text-[#082552]">
                    {bankGain}f
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center opacity-100 absolute bg-[hsla(0,0%,100%,0.7)] backdrop-blur-sm transition-opacity duration-[0.5s] ease-[ease-in-out] text-center inset-0 max-[600px]:mt-7">
                <h3 className="text-[2.5rem] tracking-[-1px] leading-tight font-bold mb-[0.7em] invest-overlay-h3">
                  Prêt à commencer à investir ?
                </h3>
                <a href="" className="button_auth">
                  Commencer
                </a>
                <a
                  href=""
                  className=" bg-transparent text-[#0066f5] mt-4 shadow-none font-semibold p-0 normal-case text-[16px]"
                >
                  Pas encore
                </a>

                <p className="text-[#6c82a3] text-center max-w-[800px] text-sm mt-[50px] mb-0 mx-auto">
                  Les calculs sont basés sur la performance moyenne des fonds
                  communs de placement conservateurs sur Epargne à partir de
                  2024. Le calcul exclut les frais de traitement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
