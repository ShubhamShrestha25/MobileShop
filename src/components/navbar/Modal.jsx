import React, { useState } from "react";
import "./Navbar.css";

 const Modal= () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam excepturi corrupti doloremque accusantium id ratione ipsa veniam eum magnam soluta molestias accusamus, maiores tenetur quae temporibus aperiam, sint expedita illum, libero error deserunt maxime omnis vero. Quis, iste. Dignissimos quidem repellat architecto expedita atque, nam fuga nihil maxime ducimus dolorem magnam in quae cum animi exercitationem et velit? Est vitae repellat, ratione, necessitatibus facilis veritatis, saepe tempore accusamus magni deleniti itaque aliquid rem! Ea laborum soluta et minima animi maiores unde aliquid modi quod quasi minus quae exercitationem earum pariatur iste, quisquam dolores magnam possimus sapiente excepturi nihil quibusdam, labore eius nam. Iure, repellendus! Voluptates eveniet, doloribus voluptatibus enim non rerum provident modi fuga possimus cumque quis. Ea laudantium eaque vitae, neque consequatur mollitia tempore numquam nam rerum amet porro aspernat at, provident modi facere assumenda quisquam repudiandae accusamus, corrupti ullam impedit harum odio ex ipsa. Repellat iste, voluptas saepe eius omnis ullam. Rem saepe, officia, adipisci magnam minima accusamus voluptatibus aliquid illum molestias ab autem quis rerum mollitia corrupti! Soluta aliquid doloribus repudiandae non odit voluptas error impedit, quod repellendus fugiat, esse distinctio quaerat cum animi excepturi qui! Vel porro quod non dolore exercitationem repellendus illum, quisquam architecto cum autem? Fuga ab perferendis et ut deserunt laboriosam ipsam perspiciatis consequuntur, modi molestias sint, adipisci nam aliquid numquam ut corrupti sapiente placeat officiis cupiditate esse sit perferendis. Cupiditate molestias eos quis sapiente, rem nobis eveniet quisquam? Aut moleses debitis optio sint tempore, aliquid exercitationem ea doloremque laudantium vel nisi placeat. Similique tempora ad possimus delectus minima. In, sint sapiente dolor sunt placeat enim nulla cupiditate exercitationem nemo, excepturi dolores ullam. Exercitationem voluptate repellat incidunt nulla eius nisi, vero et magni provident? Impedit dolorum eveniet neque ducimus solutadita dicta? Id sapiente optio, provident quasi quidem eos adipisci autem do quisquam excepturi impedit quae harum eum sit corporis assumenda dignissimos fuga sunt alias illum doloribus voluptatem, aliquid quia! Id sunt facilis odio soluta, accusamus vel voluptatum aut deserunt rerum laborum placeat adipisci doloribus! Deserunt, quisquam molestiae.</p>
    </>
  );
}

export default Modal;