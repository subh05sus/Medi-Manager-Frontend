import React, { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import GrowthChart from "./GrowthChart";
const swal = require("sweetalert2");

const ExpandableCard = forwardRef(({ content, setExpanded }, ref) => {
  const data = {
    options: {
      grid: {
        show: false,
      },
      // colors: ["#256e6b","#bff8e5","#52AA7D"],
      chart: {
        type: "line",
        stacked: false,
      },
      xaxis: {
        categories: [
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
        ],
        axisBorder: {
          show: true,
          color: "#000",
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: "#000",
        },
        axisTicks: {
          show: false,
        },
      },
      stroke: {
        width: [3],
        curve: "smooth",
      },
      // plotOptions: {
      //   bar: {
      //     columnWidth: "50%"
      //   }
      // },

      // fill: {
      //   opacity: [0.85, 0.25, 1],
      //   gradient: {
      //     inverseColors: false,
      //     shade: "light",
      //     type: "vertical",
      //     opacityFrom: 0.85,
      //     opacityTo: 0.55,
      //     stops: [0, 100, 100, 100]
      //   }
      // },
      markers: {
        size: 0,
      },
      // tooltip: {
      //   shared: true,
      //   intersect: false,
      //   y: {
      //     formatter: function(y) {
      //       if (typeof y !== "undefined") {
      //         return y.toFixed(1);
      //       }
      //       return y;
      //     }
      //   }
      // }
    },
    series: [
      // {
      //   name: "People Age(in years)",
      //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      //   type: "column",
      //   color: "#256e6b",
      //   borderWidth: 0,
      // },
      // {
      //   name: "People Height(in cm)",
      //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      //   type: "area",
      //   // color: '#bff8e5',
      // },
      {
        name: "People Weight(in kg)",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        color: "#52AA7D",
      },
    ],
  };

  return (
    <motion.div ref={ref} className="ExpandedCard" layoutId={content.id}>
      <motion.div className="card-title">
        <motion.h4>{content.heading}</motion.h4>
        <motion.div className="buttons">
          <motion.button className="btn">Add Data</motion.button>
          <motion.button className="btn">Edit</motion.button>
          <motion.button className="btn">Print</motion.button>
          <motion.button onClick={setExpanded} className="btn">
            Close
          </motion.button>
        </motion.div>
      </motion.div>
      {content.id === 1 ? (
        <>
          <motion.ul className="Chatbox">
            <motion.li style={{ paddingLeft: "0", fontSize: "1vw" }}>
              Please get your eyes dialated before appointment
            </motion.li>
          </motion.ul>
          <motion.form
            className="input-wrapper"
            style={{
              backgroundColor: "#ffffff",
              height: "15%",
              border: "1px solid #74C0C3",
              borderRadius: "10px",
            }}
          >
            <motion.input
              type="text"
              placeholder="Type something here..."
              id="message"
            />
            <motion.button
              type="submit"
              style={{ border: "none", background: "transparent" }}
            >
              <FiSend style={{ fontSize: "1.5vw", color: "#383c44" }} />
            </motion.button>
          </motion.form>
        </>
      ) : null}
      {content.id === 2 ? <GrowthChart state={data} /> : null}
      {content.id === 2 && <GrowthChart state={data} />}
      {content.id === 3 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Comming Soon</h5>
        </motion.div>
      )}
      {content.id === 4 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Comming Soon</h5>
        </motion.div>
      )}
      {content.id === 5 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Comming Soon</h5>
        </motion.div>
      )}
    </motion.div>
  );
});

export const CompactCard = ({ content, setExpanded, patient }) => {
  const data = {
    options: {
      colors: ["#e9f6fa", "#256e6b", "#095D7E"],
      chart: {
        type: "line",
        stacked: false,
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        axisBorder: {
          show: true,
          color: "#74C0C3",
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: "#000",
        },
        axisTicks: {
          show: false,
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      grid: {
        show: false,
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1);
            }
            return y;
          },
        },
      },
    },
    series: [
      {
        name: "Age",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        type: "area",
        color: "#256e6b",
        borderWidth: 0,
      },
      {
        name: "Height",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        type: "area",
        color: "#00e396",
      },
      {
        name: "Weight",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        color: "#52AA7D",
      },
    ],
  };
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [patientData, setPatientData] = useState(() => {
    const data = localStorage.getItem("patientData");
    return data ? JSON.parse(data) : [];
  });

  // Load initial data for the patient if it exists
  useEffect(() => {
    const existingPatient = patientData.find((p) => p.id === patient);
    if (existingPatient) {
      setHeight(existingPatient.height);
      setWeight(existingPatient.weight);
    } else {
      setHeight("");
      setWeight("");
    }
  }, [patient, patientData]);

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSubmit = () => {
    const newPatient = {
      id: patient,
      height: height,
      weight: weight,
    };

    const updatedPatientData = [
      ...patientData.filter((p) => p.id !== patient),
      newPatient,
    ];
    setPatientData(updatedPatientData);
    localStorage.setItem("patientData", JSON.stringify(updatedPatientData));
    console.log("updated vitals");
    console.log(localStorage.getItem("patientData"));
    // Reset inputs after submitting if you want to
    // setHeight('');
    // setWeight('');
    // setPatient((prev) => prev + 1);
    swal.fire({
      title: "Vitals Updated",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <motion.div
      className="CompactCard"
      layoutId={content.id}
      // onClick={setExpanded}
    >
      <motion.div className="heading">{content.heading}</motion.div>
      {content.id === 1 && (
        <motion.ul className="Chats">
          <motion.li style={{ paddingLeft: "0" }}>
            Please get your eyes dialated before appointment
          </motion.li>
        </motion.ul>
      )}
      {content.id === 2 && <GrowthChart state={data} />}
      {content.id === 3 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <h5>Vitals for {patient}</h5> */}
          <div>
            <input
              type="number"
              placeholder="Height (in cm)"
              value={height}
              onChange={handleHeightChange}
              style={{
                margin: "10px 0",
                padding: "10px",
                width: "100%",
                borderRadius: "10px",
                border: "1px solid #095D7E",
                backgroundColor: "#fff",
              }}
            />
            <input
              type="number"
              placeholder="Weight (in kg)"
              value={weight}
              onChange={handleWeightChange}
              style={{
                margin: "10px 0",
                padding: "10px",
                width: "100%",
                borderRadius: "10px",
                border: "1px solid #095D7E",
                backgroundColor: "#fff",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#256e6b",
                color: "#fff",
                cursor: "pointer",
                width:'100%'
              }}
            >
              Submit
            </button>
          </div>
        </motion.div>
      )}
      {content.id === 4 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Comming Soon</h5>
        </motion.div>
      )}
      {content.id === 5 && (
        <motion.div
          style={{
            color: "#005F73",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Comming Soon</h5>
        </motion.div>
      )}
    </motion.div>
  );
};

const Card = ({ content, patient }) => {
  const [isExpanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return isExpanded ? (
    <ExpandableCard
      ref={cardRef}
      setExpanded={() => setExpanded(false)}
      content={content}
    />
  ) : (
    <CompactCard
      setExpanded={() => setExpanded(true)}
      content={content}
      patient={patient}
    />
  );
};

export default Card;
