import Swal from "sweetalert2";

const useSweetAlert = () => {
    const showAlert = ({
        title,
        text,
        confirmText = "Submit",
        cancelText = "Cancell",
        onConfirm,
        onCancel,
        icon,
    }) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            cancelButtonText: cancelText,
            confirmButtonText: confirmText,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            reverseButtons: true,
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
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                onCancel();
            }
        });
    };

    return showAlert;
};

export default useSweetAlert;
