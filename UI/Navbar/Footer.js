const Footer =()=> {
    return (
      <div className="foot bg-dark align-items-center" style={{color:'white',display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center', justifyItems:'center'}}>
          <div >
          <h2>Wesley's Farm</h2>
          </div>
          <div>
          <text style={{fontSize:12}}>Copyright &copy; 2022 Wesley's Farm</text>
          </div>
          <div>
            <a style={{color:"lightblue"}} href="">Legal Stuff</a> | <a style={{color:"lightblue"}} href="">Privacy Policy</a>
          </div>
      </div>
    )
  }
  
  export default Footer