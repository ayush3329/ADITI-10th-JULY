import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doctors } from "../../assets/data/doctors";

function DocDetails() {
  const { docId } = useParams();
  const [doctorData, setDoctorData] = useState();

  useEffect(() => {
    const docData = doctors.find((docData) => docData.id === docId);
    setDoctorData(docData);
  }, [docId]);

  return (
    <div>
      <>
        <h2> {doctorData && doctorData?.name} </h2>
        Display other details of the doctor
      </>
    </div>
  );
}

export default DocDetails;
