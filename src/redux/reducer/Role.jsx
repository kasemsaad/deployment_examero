// import Api_Dashboard from "../../dashboard/interceptor/interceptorDashboard";
// import { ROLE } from "../Types/types";
// let img = "";
// let rolee = ""


// const accessRole = (state = { role: "", image: "" }, action) => {


//     if (action.type === ROLE) {

//         const getRefresh = async () => {
//             await Api_Dashboard.get(`/refresh`)
//                 .then((response) => {
//                     // console.log(response);
//                     let name_image = response.data.User.media.name;
//                     // SetpersonalDashboard(name_image);
//                     img = response.data.User.media.name;
//                     rolee = "response.data.User.role_name"
//                     return {
//                         ...state,
//                         role: rolee,
//                         image: img
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching subjects data:");
//                     return state;
//                 });
//         };

//         return getRefresh()
//     }

//     return state;
// }
// export default accessRole;


// import { ROLE } from "../Types/types";

// const initialState = {
//     role: "",
//     image: ""
// };

// const accessRole = (state = initialState, action) => {
//     switch (action.type) {
//         case ROLE:
//             console.log('Updating state with role and image:', action.payload); // تأكد من تلقي البيانات هنا

//             return {
//                 ...state,
//                 role: action.payload.role,
//                 image: action.payload.image
//             };
//         default:
//             return state;
//     }
// };

// export default accessRole;


import { ROLE } from "../Types/types";

const initialState = {
  role: localStorage.getItem('role') || "", // Retrieve from localStorage if available
  image: localStorage.getItem('image') || "" // Retrieve from localStorage if available
};

const accessRole = (state = initialState, action) => {
  switch (action.type) {
    case ROLE:
      const newState = {
        ...state,
        role: action.payload.role,
        image: action.payload.image
      };

      // Save to localStorage
      localStorage.setItem('role', newState.role);
      localStorage.setItem('image', newState.image);

      return newState;
    default:
      return state;
  }
};

export default accessRole;