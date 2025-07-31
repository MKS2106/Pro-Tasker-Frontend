import { useState, useEffect } from "react"
import { backendClient } from "../client/backendClient";

function AdminUser(){
    const [users, setUsers] = useState([])

     useEffect(() => { 
            
        const fetchUsers = async () => {
          try {
               const res = await backendClient.get("/users/allusers"
                , {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("protasker-token")
                )}`,
              },
            }
        );
            console.log(res.data);
            setUsers(res.data);
          } catch (error) {}
        };
    
        
        fetchUsers();
        //  }
      }, []);

    return(
        <main>
            <h2 className="font-bold text-xl text-center mb-1 mt-4">Welcome Admin: Dispalying All Users</h2>
                 {/* <h1>Welcome Admin: Dispalying All User</h1> */}
                 {/* <div className="grid grid-cols-3 gap-4"> */}
        {/* {projects.length > 0 && ( */}
          {users.length > 0 ? (
          <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
              >
                <h4
                  className="text-lg font-semibold text-blue-600 underline mb-2"
                   > Name: 
                  {user.username}
                </h4>
                <p className="text-gray-700 mb-4">Role: {user.role}</p>

                     
              </div>
            ))}
          </div>
        ): <p className="text-center font-semibold text-orange-800 italic mt-2"> There are no Users.</p>}
      

        </main>
       


    )
}
export default AdminUser