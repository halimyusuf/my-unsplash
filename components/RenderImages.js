import Image from "next/image";

export default function RenderImages({ images }) {
  return (
    <div>
      <div className="row">
        {images.map((a) => (
          <div
            key={a.url}
            className="col-sm-6 col-md-4 px-2 my-2"
            style={{ maxWidth: "100%", margin: "" }}
          >
            <div className="rend-image-cont">
              <div className="img-modal">
                <div className="img-modal-content px-2">
                  {/* <div className="img-delete-btn">delete</div> */}
                  <div className="img-modal-text">{a.label}</div>
                </div>
              </div>
              <Image src={a.url} width="500" height="350" alt={a.label} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
