import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

export const ChartComponent = ({ selectedCurrencyFrom, selectedCurrencyTo, data, colors }) => {
  const {
    backgroundColor = 'black',
    lineColor = '#2962FF',
    textColor = 'white',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = colors || {};

  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const areaSeriesRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
      chartRef.current.timeScale().fitContent();

      areaSeriesRef.current = chartRef.current.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      areaSeriesRef.current.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.frankfurter.app/2024-08-01..?from=${selectedCurrencyFrom}&to=${selectedCurrencyTo}`;

        const response = await fetch(url);
        const apiData = await response.json();
        const formattedData = Object.keys(apiData["rates"]).map(date => ({
          time: date,
          value: apiData["rates"][date][selectedCurrencyTo]
        }));

        if (areaSeriesRef.current) {
          areaSeriesRef.current.setData(formattedData);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, [selectedCurrencyFrom,selectedCurrencyTo]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};
