export default function Loader({ condition }) {
  return (
    <>
      {condition ? (
        <div className="loader-modal">
          <div className="loader-modal-content-cont">
            <div className="loader-modal-content"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
