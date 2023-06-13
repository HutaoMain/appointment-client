import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./AdminComponent.css";
// import moment from "moment";
import { AppointmentInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const AdminComponent = () => {
  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["adminComponent"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/appointment/list`).then(
        (res) => res.json()
      ),
  });

  const appointmentColumn: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // valueFormatter: (params) => moment(params.value).format("hh:mm A"),
    },
    {
      field: "inquiryMessage",
      headerName: "Inquiry Message",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        const handleStatusChange = (event: any) => {
          const newStatus = event.target.value;
          axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/appointment/update/${
              params.row._id
            }`,
            {
              status: newStatus,
            }
          );
          toast.success("Successfully updated status!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        };

        return (
          <select
            defaultValue={params.row.status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Accept">Accept</option>
          </select>
        );
      },
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
      }}
    >
      <section className="data-grid">
        <DataGrid
          rows={data ?? []}
          columns={appointmentColumn}
          getRowId={(row) => row._id}
          sx={{ width: "1240px" }}
        />
      </section>
    </div>
  );
};

export default AdminComponent;
