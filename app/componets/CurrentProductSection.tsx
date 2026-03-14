
import ShopCard from "./ShopCard";

const CurrentProductSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 md:h-[500px]">

        {/* Left Big Card */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full">
          <ShopCard
            image="/images/Crochet.jpg"
            description="Explore Unique Quilling Art Pieces"
            title={
              <>
                Add a Touch of <br /> Handmade Beauty
              </>
            }
          />
        </div>

        {/* Right Side Cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="h-[150px] md:h-1/2">
            <ShopCard
              image="/images/Quiling.jpg"
              description="Handcrafted Wool Art Made with Heart"
              title={
                <>
                  Threads That Tell a <br /> Story
                </>
              }
              titleSize="text-2xl"
            />
          </div>

          <div className="h-[150px] md:h-1/2">
            <ShopCard
              image="/images/Sketch.jpg"
              description="Own detailed sketches crafted by passionate hands."
              title={
                <>
                  Drawn from the <br /> Heart
                </>
              }
              titleSize="text-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CurrentProductSection;

