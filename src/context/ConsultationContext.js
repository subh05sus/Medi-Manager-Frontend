import { createContext, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import config from "../config";
const swal = require("sweetalert2");

const ConsultationContext = createContext();

export default ConsultationContext;

export const ConsultationProvider = ({ children }) => {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  const CreateConsultation = async (appointmentId) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
        }),
      }
    );

    if (response.status === 200) {
      navigate("/doc/newconsult", { state: { appointmentid: appointmentId } });
      swal.fire({
        title: "Continue Consultation",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (response.status === 201) {
      navigate("/doc/newconsult", { state: { appointmentid: appointmentId } });
      swal.fire({
        title: "Consultation Started",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const SymptomPost = async (appointmentId, symptom) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation-symptom/add/ `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          symptoms: symptom,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Symptoms Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const FindingsAdd = async (appointmentId, findings, isChecked) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          finding: findings,
          is_saved: isChecked,
        }),
      }
    );

    if (response.status === 200) {
      swal.fire({
        title: "Findings Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const DiagnosisAdd = async (appointmentId, diagnosis, isChecked) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          diagnosis: diagnosis,
          is_saved: isChecked,
        }),
      }
    );

    if (response.status === 200) {
      swal.fire({
        title: "Diagnosis Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const MedicinePost = async (appointmentId, medicine) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation-medicine/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          medicines: medicine,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Medicines Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const MedicineTemplatePost = async (medicine, template_name) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/template-master/detail/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          template_name: template_name,
          template_type: "MS",
          medicine_sets: medicine,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Template Added Successfully",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const InvestigationPost = async (appointmentId, investigations) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation-investigation/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          investigations: investigations,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Investigations Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const InvestigationTemplatePost = async (investigations, template_name) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/template-master/detail/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          template_name: template_name,
          template_type: "IS",
          investigation_sets: investigations,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Template Added Successfully",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const InstructionPost = async (appointmentId, instructions) => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation-instruction/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          instruction: instructions,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Instructions Added",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const ConsultationPatch = async (
    appointmentId,
    refer_doctor,
    follow_up_date,
    height,
    weight,
    specialitization,
    clinicName,
    clinicAddress,
    clinicPhone,
    timing,
  ) => {
    console.log("Det: ", height, weight);
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/appointment/${appointmentId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          status: "CL",
          refer_doctor: refer_doctor,
          follow_up_date: follow_up_date,
          height: height,
          weight: weight,
          specialitization: specialitization,
          clinicName: clinicName,
          clinicAddress: clinicAddress,
          clinicPhone: clinicPhone,
          timing: timing,
        }),
      }
    );
    if (response.status === 200) {
      navigate("/doc/home");
      swal.fire({
        title: "Consultation Completed",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const PrescriptionPrint = async (
    appointmentId,
    refer_doctor,
    follow_up_date,
    height,
    weight,
    specialitization,
    clinicName,
    clinicAddress,
    clinicPhone,
    timing,
  ) => {
    console.log(
      "details: ",
      appointmentId,
      refer_doctor,
      follow_up_date,
      height,
      weight,
      clinicName,
      clinicAddress,
      clinicPhone,
      timing,
    );
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/consultation/rx-print/?appointment_id=${appointmentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        // body: JSON.stringify({
        // })
        body: JSON.stringify({
          refer_doctor: refer_doctor,
          follow_up_date: follow_up_date,
          height: height,
          weight: weight,
          specialitization: specialitization,
          clinicName: clinicName,
          clinicAddress: clinicAddress,
          clinicPhone: clinicPhone,
          timing: timing,
        }),
      }
    );
    if (response.status === 201) {
      // swal.fire({
      //     title: "Instructions Added",
      //     icon: "success",
      //     toast: true,
      //     timer: 6000,
      //     position: 'top-right',
      //     timerProgressBar: true,
      //     showConfirmButton: false,
      // })
      console.log("PDf generated");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      return url;
    } else if (response.status === 200) {
      swal.fire({
        title: "Prescription saved in Downloads Folder",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      console.log("PDf generated");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const contextData = {
    CreateConsultation,
    InstructionPost,
    SymptomPost,
    FindingsAdd,
    DiagnosisAdd,
    MedicinePost,
    MedicineTemplatePost,
    InvestigationPost,
    InvestigationTemplatePost,
    ConsultationPatch,
    PrescriptionPrint,
  };

  return (
    <ConsultationContext.Provider value={contextData}>
      {children}
    </ConsultationContext.Provider>
  );
};
