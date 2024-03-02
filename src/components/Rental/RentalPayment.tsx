import React, { useEffect, useState } from "react";
import { FaCcMastercard } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { MdContactless } from "react-icons/md";
import { SiMastercard } from "react-icons/si";
import "../../styles/rentalpayment.css";

type Props = {};

const RentalPayment = (props: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontAnimEnd, setIsFrontAnimEnd] = useState(false);
  const [isBackAnimEnd, setIsBackAnimEnd] = useState(false);

  const [cardInfos, setCardInfos] = useState<any>({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChangeForm = (e: any) => {
    if (e.target.name === "expiry") {
      const { value } = e.target;
      let formattedValue = value;
      if (
        value.length === 3 &&
        value.indexOf("/") === -1 &&
        !isNaN(parseInt(value[value.length - 1]))
      ) {
        formattedValue = value.slice(0, 2) + "/" + value.slice(2);
      }
      setCardInfos({ ...cardInfos, [e.target.name]: formattedValue });
    } else {
      setCardInfos({ ...cardInfos, [e.target.name]: e.target.value });
    }
  };
  const formatCardNumber = (value: any) => {
    if (!value) return "";

    const cleanedValue = value.replace(/\D/g, "");

    let formattedValue = "";
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += cleanedValue[i];
    }

    return formattedValue;
  };
  const handleCvvFocus = () => {
    setIsFlipped(true);
  };

  const handleCvvBlur = () => {
    setIsFlipped(false);
    setIsFrontAnimEnd(false);
    setIsBackAnimEnd(false);
  };

  return (
    <div className="my-4 d-flex flex-column gap-4">
      <div className="row d-flex flex-column flex-md-row gap-2 m-2 align-items-center justify-content-center">
        <div className="credit-card-input col-md-6 d-flex flex-column gap-3 py-4 align-items-center justify-content-center">
          <div className="d-flex flex-column w-80">
            <input
              className="form-control"
              name="name"
              placeholder="İsim Soyisim"
              type="text"
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.name}
            />
          </div>
          <div className="d-flex flex-column w-80">
            <input
              className="form-control"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              type="text"
              maxLength={19}
              onChange={(e) => handleChangeForm(e)}
              value={formatCardNumber(cardInfos.cardNumber)}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="d-flex flex-column w-80 gap-3">
            <input
              className="form-control"
              type="text"
              name="expiry"
              maxLength={5}
              placeholder="MM/YY"
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.expiry}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "/"
                ) {
                  e.preventDefault();
                }
              }}
            />
            <input
              className="form-control"
              type="text"
              name="cvv"
              maxLength={3}
              placeholder="CVV"
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              onChange={(e) => handleChangeForm(e)}
              value={cardInfos.cvv}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column gap-2 py-4 align-items-center">
          <div
            className={` credit-card-visual w-100 flex-column gap-1 bg-dark w-80 rounded text-light p-3  ${
              isFlipped && "front"
            } ${isFrontAnimEnd ? "d-none" : "d-flex"}`}
            onAnimationEnd={() => setIsFrontAnimEnd(true)}
          >
            <div>Credit Cart</div>
            <div className="d-flex justify-content-between">
              <div>
                <FcSimCardChip size={50} />
              </div>
            </div>
            <div className="d-flex justify-content-start">
              {cardInfos.cardNumber
                ? cardInfos.cardNumber
                : "0000 0000 0000 0000"}
            </div>
            <div className="row ">
              <div className="col-8">
                <div className="d-flex justify-content-start">
                  {cardInfos.expiry ? cardInfos.expiry : "MM/DD"}
                </div>
                <div
                  className="d-flex justify-content-start"
                  style={{
                    fontSize: `${Math.max(
                      15,
                      20 /
                        Math.max(
                          1,
                          Math.ceil(
                            (cardInfos.name ? cardInfos.name.length : 1) / 10
                          )
                        )
                    )}px`,
                  }}
                >
                  {cardInfos.name ? cardInfos.name : "İsim Soyisim"}
                </div>
              </div>
              <div className="col text-end">
                <FaCcMastercard size={50} />
              </div>
            </div>
          </div>
          <div
            className={`credit-card-visual w-100 flex-column gap-1 bg-dark w-80 rounded text-light p-3  ${
              isFrontAnimEnd && "back"
            } ${isFrontAnimEnd ? "d-flex" : "d-none"} `}
            onAnimationEnd={() => {
              setIsBackAnimEnd(true);
            }}
          >
            <div className="w-100 h-25 bg-secondary-subtle"></div>
            <div className="d-flex w-80 h-25 bg-secondary justify-content-end align-items-center">
              <div className="bg-light cvv text-dark px-3 py-1 ">
                {cardInfos.cvv ? cardInfos.cvv : "000"}
              </div>
            </div>
            <div className="text-end me-3">
              <SiMastercard size={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPayment;
