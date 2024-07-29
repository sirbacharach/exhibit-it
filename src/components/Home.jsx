import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.lang = "en";
  });

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="Exhibit-it"
          content="Art curator web app using info from two popular museums"
        />
      </Helmet>
      <div className="text-center mt-6  font-bold text-3xl pt-4 pb-2 max-w-[94%] mx-auto shadow-lg border border-gray-300 bg-titlebackground p-4 rounded-lg">
        <h1 className="py-3">Welcome to Exhib-it!</h1>
      </div>

      <div className="max-w-[94%] mx-auto mt-6 p-5 bg-titlebackground rounded-lg shadow-md border border-gray-400">
        <div className="text-lg font-main font-normal text-center">
          <p>
            Create your own exhibition from artwork taken from two different
            sources. First browse the artwork, add your favourites to a
            temporary list, then finally, carefully select the items you want to
            exhibit from your temporary list. You can add and remove artwork
            from both the temporary list and the exhibition. Deleting artwork
            from either your temporary list or your exhibition, will not delete
            from the other, so you can arrange the two lists independently.
          </p>
        </div>
      </div>

      <div className="max-w-[94%] mx-auto mt-6 p-5 bg-titletextbackground rounded-lg shadow-md border border-gray-400">
        <div className="text-left  font-bold font-headers text-2xl mb-4">
          <h1>Instructions:</h1>
        </div>

        <div className="text-lg font-main font-normal text-left">
          <p className="mb-4">
            <span className="font-bold">1. Gallery tab</span>
            <br />
            The galleries tab allows you to browse, filter and use keyword
            searches to select artwork to add to your temporary list. You can
            also click on an artwork to see it in a higher resolution with
            additional information.
          </p>
          <p className="mb-4">
            <span className="font-bold">2. A Single Artwork</span>
            <br />
            When you click on an artwork, you are pressented with a Single
            Artwork. From here you can view additional information and a higher
            resolution image. Here you can add or remove the artwork to and from
            Your Temporary List and Your Exhibition.
          </p>
          <p className="mb-4">
            <span className="font-bold">3. Your Temporary List tab</span>
            <br />
            Here is where you will view your temporary list, you can click on
            artworks to view them in more detail, you can delete it from your
            temporary list and you can add or remove it from your exhibition.
          </p>
          <p className="mb-4">
            <span className="font-bold">4. Your Exhibition tab</span>
            <br />
            This is your final selection of artwork for your exhibition, from
            this screen you can inspect artwork in more detail by clicking on
            one of them, and you can add and remove it both from your exhibition
            or your temporary list. These two lists are independent of each
            other, so deleting an artwork from your exhibition will not delete
            it from your temporary list and vice versa.
          </p>
          <p className="mb-4">
            <span className="font-bold">5. Saving and Loading</span>
            <br />
            You may notice that on Your Temporary List and Your Exhibition List
            screens, there are Load and Save buttons. If you choose to "Save to
            File", you will be prompted to enter a file name. The file will be
            saved in your default "Downloads" folder, which may depend upon the
            device you are using. You can then send this file onto a friend or
            colleague, for them to then "Load from File". When saving, both the
            Temporary and Exhibition lists will be saved in the same file. When
            the file is loaded, you should ensure that you load the file from
            the desired page.
            </p>
            <p>For example, if you want to load the Exhibition
            List from the file, ensure you click the "Load from File" button on
            the Your Exhibition List page. In this example, any artworks you had
            selected in Your Exhibition List would be overwritten by those in
            the file, but Your Temporary List would not be affected.
            Alternately, if you load the file from Your Temporary List page, it
            will only load the Temporary List from the file overwriting any you
            had in this list and will not affect Your Exhibition List. Remember,
            both Your Temporary List and Your Exhibtiion List can be over
            written when loading a file, so if you'd like to keep your own
            exhibition, remember to save your lists.
          </p>
        </div>
      </div>
      <div className="max-w-[94%] text-xs mx-auto mt-6 p-5 bg-titlebackground rounded-lg shadow-md border border-gray-400">
        <div className="text-sm font-main font-normal text-left">
          <p className="font-bold">Credits:</p>
          <p>
            All artwork information and images are retrieved from the following
            two public APIs
          </p>
          <p className="pt-4 pb-2 text-yellow-300 hover:text-yellow-100">
            <a href="https://www.vam.ac.uk/">
              Victoria and Albert Museum (API)
            </a>
          </p>
          <p className="pt-2 text-yellow-300 hover:text-yellow-100">
            <a href="https://www.rijksmuseum.nl/en/">Rijks Museum (API)</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
