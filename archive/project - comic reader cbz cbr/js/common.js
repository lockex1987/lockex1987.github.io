const CommonUtils = {

    isImageFile: (url) => {
        const fileExtension = url.split('.')
            .pop()
            .toLowerCase();
        return ['jpg', 'jpeg', 'png'].includes(fileExtension);
    }
};

// alert(CommonUtils);
