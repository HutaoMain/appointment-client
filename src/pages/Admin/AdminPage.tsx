import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./AdminPage.css";
import { AppointmentInterface } from "../../types/Types";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPage = () => {
  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["AdminPage"],
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
      field: "email",
      headerName: "user Email",
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
              userNotification: true,
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
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        };

        return (
          <select
            defaultValue={params.row.status}
            onChange={handleStatusChange}
            className={`admin-component-select ${params.row.status}`}
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accept</option>
            <option value="Rejected">Reject</option>
          </select>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        const handleChangeMarkAsRead = () => {
          axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/appointment/update/${
              params.row._id
            }`,
            {
              adminMarkAsRead: true,
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
          <>
            {params.row.adminMarkAsRead === true ? (
              <></>
            ) : (
              <button onClick={handleChangeMarkAsRead}>Mark as Read</button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="admin-component">
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

export default AdminPage;
