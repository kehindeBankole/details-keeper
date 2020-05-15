const form = document.getElementById("myform")
const modal = document.getElementById("mymodal")
const closebtn = document.getElementById("close")
const states = ["lagos", "ogun", "ibadan"]
states.forEach((element) => {
    document.getElementById("state").innerHTML += `
    <option value=${element} id=${element}>${element}</option> 
    `
})
s
const fd = document.getElementById("state").children
for (var i = 0; i < fd.length; i++) {
    console.log( document.getElementById(`${fd[i].id}`) )

}
form.addEventListener("submit", (e) => {
    const fname = document.getElementById("fname").value
    const lname = document.getElementById("lname").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
    const school = document.getElementById("school").value

    const details = {
        fname: fname,
        lname: lname,
        email: email,
        school: school,
        address: address
    }

    if (localStorage.getItem("details") === null) {
        const detailsarray = []
        detailsarray.push(details)
        localStorage.setItem("details", JSON.stringify(detailsarray))

    } else {
        const detailsfromstore = JSON.parse(localStorage.getItem("details"))
        detailsfromstore.push(details)
        const dt = JSON.parse(localStorage.getItem("details"))
        const ag = []
        for (let i = 0; i < dt.length; i++) {
            ag.push(dt[i].email)
        }
        if (ag.includes(email)) {
            console.log("email already exist")
            modal.style.display = "block"
            e.preventDefault()
            return false
        } else {
            localStorage.setItem("details", JSON.stringify(detailsfromstore))
        }
        console.log(detailsfromstore)
    }
    fetch()
    e.preventDefault()
})

const fetch = () => {
    if (localStorage.getItem("details") === null) {} else {
        const details = JSON.parse(localStorage.getItem("details"))
        document.getElementById("table").innerHTML = `
        <thead>
        <tr>
          <th scope="col">s/n</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">email</th>
          <th scope="col">adress</th>
          <th scope="col">school</th>
        </tr>
      </thead>
      <tbody id="body"> 
    
      </tbody>
        `
        details.forEach((element, index) => {
            document.getElementById("table").innerHTML += `
         <tr>
         <th scope="row">${++index}</th>
         <td>${element.fname}</td>
         <td>${element.lname}</td>
         <td>${element.email}</td>
         <td>${element.address}</td>
         <td>${element.school}</td>
       </tr>`
        });
    }

}
closebtn.addEventListener("click", () => {
    modal.style.display = "none"
})