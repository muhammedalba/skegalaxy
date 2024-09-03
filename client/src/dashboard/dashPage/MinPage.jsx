import './minPage.css'
import { Fade } from "react-awesome-reveal"

const MinPage = () => {
    return (

            <h2 className="w-100 d-flex align-items-center justify-content-center p-2 text-center">            
                <Fade className="MinPage " duration={200}  direction='up'  cascade>
                  اهلا بك مجددا في لوحة التحكم الخاصه بك
                  </Fade>
            </h2>
                  
        // 
      
    );
}

export default MinPage;
