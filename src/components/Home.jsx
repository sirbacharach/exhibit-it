const Home = () => {
  return (
    <>
      <div className="text-center text-white font-bold text-2xl pt-2 pb-1 mx-36">
        <h1>Welcome to Exhibit-it!</h1>

        <br></br>

        <div className="text-lg font-main font-normal">
          <p>
            Create your own exhibition from data taken from 2 different sources.
            First browse the artwort, add your favourites to a temporary list,
            then finally, carefully select the items you want to exhibit from
            your temporary list. You can add and remove artwork from both the
            temporary list and the exhibit. Deleting artwork from either your
            temporary list or your exhibit, will not delete from the other, so
            you can arrange them however you'd like.
          </p>
        </div>

        <br></br>
        <br></br>

        <div className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1 mx-36">
          <h1>Instructions:</h1>
        </div>

        <br></br>

        <div className="text-lg font-main font-normal">
          <p>1. Gallery tab</p>
          <p>
            The galleries tab allows you to browse and select artwork to add to
            your temporary list.
          </p>
          <p>
            You can also click on an artwork to see it in more detail with
            additional information.
          </p>
          <br></br>
          <p>2. A Single Artwork</p>
          <p>
            From here you can view additional information and a more detailed
            image. You can add or remove the artwork to your collections.
          </p>
          <p>
            You'll notice that if you click the 'Add to List' button, you then
            can add it to your exhibit if you choose to do so.
          </p>
          <br></br>
          <p>3. Your temporary list</p>
          <p>
            Here is where you will view your temporary list, you can click on
            artworks to view them in more detail, you can delete it from your
            temporary list and you can add or remove it from your exhibit.
          </p>
          <br></br>
          <p>4. Your Exhibition</p>
          <p>
            This is your final selection of artwork for your exhibition, from
            this screen you can inspect artwork in more detail by clicking on
            one of them, and you can add and remove it both from your exhibition
            or your temporary list.
          </p>
          <p>
            These two lists are indipendant of each other, so deleting it from
            your exhibition will not delete it from your temporary list.
          </p>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default Home;
