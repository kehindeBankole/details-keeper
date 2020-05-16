const form = document.getElementById("myform")
const modal = document.getElementById("mymodal")
const closebtn = document.getElementById("close")
const states = ["lagos", "ogun", "ibadan"]
states.forEach((element) => {
    document.getElementById("state").innerHTML += `
    <option value=${element} id=${element}>${element}</option> 
    `
})

form.addEventListener("submit", (e) => {
    const fname = document.getElementById("fname").value
    const lname = document.getElementById("lname").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
    const school = document.getElementById("school").value
    const selectedstate = document.getElementById("state").options[document.getElementById("state").selectedIndex].text

    const details = {
        fname: fname,
        lname: lname,
        email: email,
        school: school,
        address: address,
        state: selectedstate,
    }

    if (localStorage.getItem("details") === null) {
        const detailsarray = []
        detailsarray.push(details)
        localStorage.setItem("details", JSON.stringify(detailsarray))

    } else {
        const detailsfromstore = JSON.parse(localStorage.getItem("details"))
        detailsfromstore.push(details)
        const detailsfromstoreaftervalueadded = JSON.parse(localStorage.getItem("details"))
        const emailfromstore = []
        for (let i = 0; i < detailsfromstoreaftervalueadded.length; i++) {
            emailfromstore.push(detailsfromstoreaftervalueadded[i].email)
        }
        if (emailfromstore.includes(email)) {
            modal.style.display = "block"
            e.preventDefault()
            return false
        } else {
            localStorage.setItem("details", JSON.stringify(detailsfromstore))
        }
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
          <th scope="col">state</th>
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
         <td>${element.state}</td>
       </tr>`
        });
    }

}
closebtn.addEventListener("click", () => modal.style.display = "none")
window.addEventListener("click", () => modal.style.display = "none")