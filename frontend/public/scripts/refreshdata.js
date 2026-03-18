const buttons = document.getElementsByClassName("role-switch-button");
const deleteButton = document.getElementById("delete-Button");
const userCard = document.getElementById("")

async function refreshData(button, userId) {
    //   console.log("Refreshing data for user:", userId);

    try {
        const res = await fetch(`add-admin/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
        });

        const data = await res.json();

        button.style.backgroundColor = data.role === 'admin' ? 'green' : 'red';
        button.innerHTML = data.role === 'admin' ? 'Demote to Customer' : 'Promote to Admin';
        // console.log('User role:', data.role);
    } catch (err) {
        console.error("Error refreshing data:", err);
    }
}

async function removeUser(userId){
    try {
        const res = fetch(`remove-user/${userId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({ userId : userId }),
        });
        const data = await res.json();
        if(data){
            alert(data);
        }

    } catch (error) {
        console.log("Error deleting the user:",error)
    }
}

async function isSure(userName, userId){
    try{
        const url = `remove-user/${userId}`;
        const validate = confirm(`Are you sure you want to delete the user: ${userName}?`);

        if (validate) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(res => {
                    if (!res.ok) console.log("Network response was not OK");
                    return res.json();
                })
                .then(data => {
                    console.log("User deleted successsfully:", data);
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                });
        }
    }
    catch(err){
        console.error('check api.js isSure')
        throw new Error(err);
    }
}
function hideUserCard(userId){
    if(!userId) alert("User Not found!!")

}
function loginResponse(){
    console.log("login pressed")
}

function logoutResponse(){
    console.log("logout pressed")
}

