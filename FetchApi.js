// this type of send to data from fetch() api
// try {
//     const res = await fetch(`${baseUrl}/users/register`, {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json",
//             "x-access-token": "token-value",
//         },
//         body: JSON.stringify({ ...formData }),
//         withCredentials: true,
//     });
//     const data = await res.json();
//     console.log(data)
//     toast.success(data.message)
// } catch (error) {
//     toast.error(data.message)
//     console.log(error)
// }