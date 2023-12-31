<?php

namespace App\Controller;

use Vitber\WeatherBundle\WeatherProvider\WeatherProviderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class WeatherController extends AbstractController
{
    public function __construct(
        private WeatherProviderInterface $weatherProvider
    ) {
    }

    #[Route('/', name: 'weather')]
    public function index()
    {
        return $this->render('weather/index.html.twig');
    }

    #[Route('/weather/{city}', name: 'weather_city')]
    public function weather(string $city)
    {
        $data = $this->weatherProvider->getWeatherData($city);

        return $this->json($data);
    }
}
