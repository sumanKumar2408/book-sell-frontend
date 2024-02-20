import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid p-3 dashboard" style={{marginTop:"10px"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Seller Name : <span style={{color:"grey"}}>{auth?.user?.name}</span></h3>
              <h3> Seller Email : <span style={{color:"grey"}}>{auth?.user?.email}</span></h3>
              <h3> Seller Contact : <span style={{color:"grey"}}>{auth?.user?.phone}</span></h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
