const Home = () => {
  return (
    <>
      <div className="text-center mt-6 text-white font-bold text-3xl pt-4 pb-2 max-w-[94%] mx-auto shadow-lg border border-gray-300 bg-titlebackground p-4 rounded-lg">
        <h1 className="py-3">Welcome to Exhib-it!</h1>
      </div>

      <div className="max-w-[94%] mx-auto mt-6 p-5 bg-titlebackground text-white rounded-lg shadow-md border border-gray-400">
        <div className="text-lg font-main font-normal text-center">
          <p>
            Create your own exhibition from artwork taken from two different
            sources. First browse the artwork, add your favourites to a
            temporary list, then finally, carefully select the items you want to
            exhibit from your temporary list. You can add and remove artwork
            from both the temporary list and the exhibit. Deleting artwork from
            either your temporary list or your exhibit, will not delete from the
            other, so you can arrange them however you'd like.
          </p>
        </div>
      </div>

      <div className="max-w-[94%] mx-auto mt-6 p-5 bg-titletextbackground text-white rounded-lg shadow-md border border-gray-400">
        <div className="text-left text-white font-bold font-headers text-2xl mb-4">
          <h1>Instructions:</h1>
        </div>

        <div className="text-lg font-main font-normal text-left">
          <p className="mb-4">
            <span className="font-bold">1. Gallery tab</span>
            <br />
            The galleries tab allows you to browse and select artwork to add to
            your temporary list. You can also click on an artwork to see it in
            more detail with additional information.
          </p>
          <p className="mb-4">
            <span className="font-bold">2. A Single Artwork</span>
            <br />
            From here you can view additional information and a more detailed
            image. You can add or remove the artwork to your collections. You'll
            notice that if you click the 'Add to List' button, you then can add
            it to your exhibit if you choose to do so.
          </p>
          <p className="mb-4">
            <span className="font-bold">3. Your temporary list</span>
            <br />
            Here is where you will view your temporary list, you can click on
            artworks to view them in more detail, you can delete it from your
            temporary list and you can add or remove it from your exhibit.
          </p>
          <p className="mb-4">
            <span className="font-bold">4. Your Exhibition</span>
            <br />
            This is your final selection of artwork for your exhibition, from
            this screen you can inspect artwork in more detail by clicking on
            one of them, and you can add and remove it both from your exhibition
            or your temporary list. These two lists are independent of each
            other, so deleting it from your exhibition will not delete it from
            your temporary list.
          </p>
        </div>
      </div>
        <div className="max-w-[94%] text-xs mx-auto mt-6 p-5 bg-titlebackground text-white rounded-lg shadow-md border border-gray-400">
          <div className="text-sm font-main font-normal text-left">
            <p className="font-bold">Credits:</p>
            <p>
              <a href="https://www.clevelandart.org/">
                The Cleveland Museum of Art (API)
              </a>
            </p>
            <p>
              <a href="https://www.artic.edu/">The Art Institute of Chicago (API)</a>
            </p>
          </div>
        </div>
    </>
  );
};

export default Home;
