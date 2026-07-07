
import "./footer.css"

function Footer(){
    return(
        <footer className="footer">
            <div className="footerclass">

            <div className="footer-bottom">
    <p>
        © {new Date().getFullYear()}  All Rights Reserved.
        Designed And Developed by  <b> Utkarsh Jaiswal (25B4507) </b>
      
    </p>
</div>
            </div>
        </footer>
    )
}
export default Footer