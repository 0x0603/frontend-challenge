const shareX = (text: string) => {
  window.open(`https://x.com/share?text=${encodeURIComponent(text)}`, "_blank");
};

export default shareX;
