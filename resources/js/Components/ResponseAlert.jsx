import Swal from "sweetalert2";

const ResponseAlert = () => {
    const showResponse = ({ icon, title, text }) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
            },
            hideClass: {
                popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
            },
        });
    };
    return showResponse;
};

export default ResponseAlert;
