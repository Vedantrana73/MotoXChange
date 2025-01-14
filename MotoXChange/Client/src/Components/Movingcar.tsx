import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Movingcar: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const imageArr: string[] = [
    "https://imgs.search.brave.com/oMJIzI8lVcbNSpjXhTeJm4ao8Vthbfegq8JoFNRyo5M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlbW9kZXN0bWFu/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxNi8wOC8yMDIw/LUhvbmRhLUNSVi5q/cGc",
    "https://imgs.search.brave.com/jRADkUawqjTc8ZvKRNaQks-7qxtG6HfkTa4o0eB97kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vZmlubi1hdXRv/L2ltYWdlL2ZldGNo/L3FfYXV0byxmX2F1/dG8sY19maWxsLGRw/cl8yLGFyXzE6MSx3/XzM3NS9odHRwczov/L2Nkbi5jb3NtaWNq/cy5jb20vMjE2ZDg3/MDAtNDViNC0xMWVl/LTkzODUtNjVhMGY4/NmM4MDVjLTIwMjNO/aXNzYW5QYXRoZmlu/ZGVyLmpwZw",
    "https://imgs.search.brave.com/LdCYF_pciJc52DHhbBlEwKqMaIi79Kv8y2cj3d7KdLo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9jOXQ2dTBx/aGJ2OWUvTklpOFg0/Zlc4cnZ0dGxxZlQw/RVhZL2UzODllZjgz/NDZjMzk0YjA2Yjc0/NTZmNzQxNGVhNTk0/LzIwMjItR01DLUhV/TU1FUi1FVi0yMTMu/anBn",
    "https://imgs.search.brave.com/K459bYcxb-wZtFmdkszw7nnB5DQiaybQjpoEJeHuS-0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZm9yZnVu/LmNvbS9mZXRjaC8y/YS8yYWJiNzA1Nzkw/NzdiZThmOTVmMzIz/ODkwMjE5YzNlYy5q/cGVn"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageArr.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  },[]);

  return (
    <div
      className="w-screen lg:w-1/2 bg-cover bg-center flex justify-center p-20 opacity-90"
      style={{ backgroundImage: `url(${imageArr[currentImage]})` }}
    >
      <div className="text-4xl font-bold">
        Buy Cars{" "}
        <Typewriter
          words={['Anywhere', 'Anytime', 'Easily']}
          loop={0} // 0 = infinite loop
          cursor={false}
          cursorStyle=""
          typeSpeed={120}
          deleteSpeed={100}
          delaySpeed={800}
        />
        <div className="font-anton text-4xl">
          With Moto
          <span className="font-libre text-5xl px-2 text-blue-900">X</span>
          Change
        </div>
      </div>
    </div>
  );
};

export default Movingcar;
