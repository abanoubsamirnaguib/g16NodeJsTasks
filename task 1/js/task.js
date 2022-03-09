const addUser = document.querySelector("#addtask")   
const tableBody = document.querySelector("#tableBody")

const tableSingle = document.querySelector("#tableSingle")
const taskHeads = [ 'name',  'balance' , 'address' ]
//read array data from storage
const readDataFromStorage= (storageKey)=>{
    let data
    try{
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        if(!Array.isArray(data)) throw new Error("is not array")
    }
    catch(e){
        data= []
    }
    return data
}
//write array to local storage
const writeDataToStorage = (data, storageKey)=>{
    localStorage.setItem(storageKey, JSON.stringify(data))
}

//add Form data to storage
const formSubmit = function(e){
    e.preventDefault()
    console.log(this.elements);
    let user = {accNum:Date.now(), createdAt: new Date()} 
    taskHeads.forEach(head => user[head]= this.elements[head].value )
    const users = readDataFromStorage("users")
    users.push(user)
    writeDataToStorage(users, "users")
    this.reset()
    window.location.href="index.html"
}
//create elements with parent, text, classes
const creatMyOwnElements = (parent, htmlElement, txt, classes)=>{
    const myEle = document.createElement(htmlElement)
    parent.appendChild(myEle)
    if(txt) myEle.textContent = txt
    if(classes) myEle.className = classes
    return myEle
}
//delete single user
const delTask = (users, i) =>{
    //remove clicked index from array
    users.splice(i, 1)
    //save data in localStorage
    writeDataToStorage(users,"users")
    //rebuild table
    showAll()
}
const makeEvent = (i, link)=>{
    //add selected id in storage
    localStorage.setItem("showId", i)
    //redirct link
    window.location.href=link
}

//show single user
const showSingle = (user, i, users ,tableSingle)=>{
    if(tableSingle){
            var tr = creatMyOwnElements(tableSingle,"tr",null, null)
    }
    else{
        var tr = creatMyOwnElements(tableBody,"tr",null, null)
    }
    creatMyOwnElements(tr,"td",i+1, null)
    const tr2 = creatMyOwnElements(tr,"td",user.accNum , null)
    taskHeads.forEach(head=>creatMyOwnElements(tr,"td",user[head], null))
    const actionTD = creatMyOwnElements(tr,"td",null, null)
    const showBtn =creatMyOwnElements(actionTD, "button", "show", "btn btn-primary me-2")
    const editBtn = creatMyOwnElements(actionTD, "button", "Edit", "btn btn-warning me-2")
    const delBtn = creatMyOwnElements(actionTD, "button", "Delete", "btn btn-danger me-2")
    delBtn.addEventListener("click", ()=>{ delTask(users, i) })
    // show button logic
    showBtn.addEventListener("click", ()=> makeEvent(i, "single.html"))
    editBtn.addEventListener("click", ()=> makeEvent(i, "edit.html"))
}
const showAll = () =>{
    //reset tbody
    tableBody.innerHTML="";
    //read data fromstorage
    const users = readDataFromStorage("users")
    //loop on data
    users.forEach((user, index)=> showSingle(user, index, users))
}
if(addUser) addUser.addEventListener("submit", formSubmit)

if(tableBody) showAll()

const edituser= document.querySelector("#editTask")
if(edituser){
    //set users as global variable on page
    const users = readDataFromStorage("users")
    //get current user  id from storage
    const i = parseInt(localStorage.getItem("showId"))
    //set form values with my user
    taskHeads.forEach(head=> edituser.elements[head].value = users[i][head])
    //on submit form
    edituser.addEventListener("submit", function(e){
        //remove form defaults
        e.preventDefault()
        //get data from form and update my array
        taskHeads.forEach(head => users[i][head]= e.target.elements[head].value )
        //update storage
        writeDataToStorage(users, "users")
        //reset form
        this.reset()
        //redirect to index
        window.location.href="index.html"
    })
}
if(tableSingle){
    //read all users
    const users = readDataFromStorage("users")
    //get current user  id from storage
    const i = parseInt(localStorage.getItem("showId"))
    //get user with index find
    const user = users.find( (t,ind) => ind == i )
    //call show function
    showSingle(user, i, users, tableSingle)
}

