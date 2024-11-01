import React, { useRef, useState, useEffect } from "react";
import "./VirtualTwin.css";
import Spline from "@splinetool/react-spline";
import Modal from "../../components/modal/Modal";
import graphPng from "../../assets/digital-twin/graph-icon.png";
import displayGraphPng from "../../assets/digital-twin/P_AC_prediction_graph.png";
import closeIcon from "../../assets/digital-twin/close.png";

const DigitalTwin = () => {
  // State Variables
  const [panelModal, setPanelModal] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState(false);
  const [rainData, setRainData] = useState([]);
  const [currentData, setCurrentData] = useState({
    IRR: "0",
    I_AC: "0.1",
    I_AC_Group1: "0.02",
    I_AC_Group2: "0.02",
    I_AC_Group3: "0.02",
    I_AC_Group4: "0.02",
    I_AC_Group5: "0.02",
    I_AC_Group6: "0.02",
    I_DC: "0.0",
    I_DC_Group1: "0.0",
    I_DC_Group2: "0.0",
    I_DC_Group3: "0.0",
    I_DC_Group4: "0.0",
    I_DC_Group5: "0.0",
    I_DC_Group6: "0.0",
    P_AC: "0",
    P_AC_Group1: "0.0",
    P_AC_Group2: "0.0",
    P_AC_Group3: "0.0",
    P_AC_Group4: "0.0",
    P_AC_Group5: "0.0",
    P_AC_Group6: "0.0",
    V_AC: "214.2",
    V_AC_Group1: "214.2",
    V_AC_Group2: "214.2",
    V_AC_Group3: "214.2",
    V_AC_Group4: "214.2",
    V_AC_Group5: "214.2",
    V_AC_Group6: "214.2",
    V_DC: "38.3",
    V_DC_Group1: "38.3",
    V_DC_Group2: "38.3",
    V_DC_Group3: "38.3",
    V_DC_Group4: "38.3",
    V_DC_Group5: "38.3",
    V_DC_Group6: "38.3",
    massaPM1: "1.79",
    massaPM2: "0.06",
    massaPM4: "0.0",
    massaPM10: "0.0",
    numPM1: "14.77",
    numPM2: "0.04",
    numPM4: "0.0",
    numPM10: "0.0",
    rainfall: "0.0",
    tamanho_medio: "0.44",
    temp: "25.12",
    timestamp: "2019-11-27 00:01:00",
    vento_dir: "0",
    vento_vel: "17.29",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupPanelModal, setPopupPanelModal] = useState(false);

  // variables fields
  const [isSimulation, setIsSimulation] = useState(true);
  const [selectedWeather, setSelectedWeather] = useState("sunny");
  const [panelCount, setPanelCount] = useState(6);

  // 3d model
  const sunnyCloudId = "3ee877df-b26a-4aa6-aa39-e7cc307147f2";
  const rainingCloudId = "efe553be-931b-4e28-8b00-b7f012689dd1";
  const dustGrassId = "7d2f27d9-16ae-493e-b7e4-549ba2814b74";
  const malfunctionPanelId = "cfdf67bf-d2ff-4d86-8918-395dc94cc8be";

  const panel1Id = "4cf7baa8-46ad-42e0-a957-33dd6b441308";
  const panel2Id = "34c7fd7d-e7a3-4f92-8869-712b45d3741b";
  const panel3Id = "f8a48e3e-e686-4b4f-ac7d-c9c7eb081bfe";
  const panel4Id = "73281c7e-c7ed-4536-bf72-1c3707f05202";
  const panel5Id = "06ed90d1-986a-4b6f-8d90-a3b81af93e5a";
  const panel6Id = "45781c43-dbb3-4744-bee7-54d8658889af";

  const sunnyCloud = useRef();
  const rainingCloud = useRef();
  const dustGrass = useRef();
  const malfunctionPanel = useRef();

  const panel1 = useRef();
  const panel2 = useRef();
  const panel3 = useRef();
  const panel4 = useRef();
  const panel5 = useRef();
  const panel6 = useRef();

  // get csv data 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/digital-twin/2019-11-20_sun_6_modified.csv");
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setRainData(parsedData);
    };

    fetchData();
  }, []);

  // loop data
  useEffect(() => {
    let index = 0;
    console.log(rainData);
    const interval = setInterval(() => {
      if (index < rainData.length) {
        setCurrentData(rainData[index]);
        setCurrentIndex(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }, [rainData]); // This effect runs every time rainData changes

  const parseCSV = (text) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const rows = lines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const values = line.split(",").map((value) => value.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
        }, {});
      });
    return rows;
  };

  // 3d model functions
  const onLoad = (spline) => {
    const sun = spline.findObjectById(sunnyCloudId);
    const rain = spline.findObjectById(rainingCloudId);
    const dust = spline.findObjectById(dustGrassId);
    const malPanel = spline.findObjectById(malfunctionPanelId);

    const p1 = spline.findObjectById(panel1Id);
    const p2 = spline.findObjectById(panel2Id);
    const p3 = spline.findObjectById(panel3Id);
    const p4 = spline.findObjectById(panel4Id);
    const p5 = spline.findObjectById(panel5Id);
    const p6 = spline.findObjectById(panel6Id);

    sunnyCloud.current = sun;
    rainingCloud.current = rain;
    dustGrass.current = dust;
    malfunctionPanel.current = malPanel;

    panel1.current = p1;
    panel2.current = p2;
    panel3.current = p3;
    panel4.current = p4;
    panel5.current = p5;
    panel6.current = p6;
  };

  const sunny = () => {
    setSelectedWeather("sunny");
    sunnyCloud.current.emitEvent("keyDown", sunnyCloudId);
  };

  const rainy = () => {
    setSelectedWeather("rainy");
    rainingCloud.current.emitEvent("keyDown", rainingCloudId);
  };

  const dusty = () => {
    setSelectedWeather("dusty");
    dustGrass.current.emitEvent("keyDown", dustGrassId);
  };

  const destroyPanel = () => { // for monitor view
    malfunctionPanel.current.emitEvent("keyDown", malfunctionPanelId);
  }

  const hidePanel = (pNo) => {
    switch (pNo) {
      case 1:
        panel1.current.emitEvent("keyDown", panel1Id);
        break;
      case 2:
        panel2.current.emitEvent("keyDown", panel2Id);
        break;
      case 3:
        panel3.current.emitEvent("keyDown", panel3Id);
        break;
      case 4:
        panel4.current.emitEvent("keyDown", panel4Id);
        break;
      case 5:
        panel5.current.emitEvent("keyDown", panel5Id);
        break;
      case 6:
        panel6.current.emitEvent("keyDown", panel6Id);
        break;
      default:
        break;
    }
      
  }

  // Interaction: 3d with code
  const clickPanel = (e) => {
    setSelectedPanel(e.target);
    setPanelModal(true);
  };

  const addPanel = (pNo) => {
    if (pNo < 6) {
      setPanelCount(pNo + 1);
      hidePanel(pNo + 1);
    }
  }

  const removePanel = (pNo) => {
    if (pNo > 0) {
      hidePanel(pNo);
      setPanelCount(pNo-1);
    }
  }

  const closeModal = () => {
    setPanelModal(false);
  };

  // variables fields
  const toggleSimuOrMonitor = () => {
    setIsSimulation(!isSimulation);
    destroyPanel();
    setPanelModal(false);
  }

  // pop up modal
  const openPopUpModal = () => {
    setPopupPanelModal(true);
  }

  const closePopUpModal = () => {
    setPopupPanelModal(false);
  }


  return (
    <div className="hero">
      <Spline className="model-3d" onLoad={onLoad} scene="https://prod.spline.design/akOAHW5FoFIagwd2/scene.splinecode" onSplineMouseUp={clickPanel}/> 

      <div className="variables">
        <div className="toggle">
          <div className={isSimulation ? "selected" : ""} onClick={toggleSimuOrMonitor}>simulation</div>
          <div className={isSimulation ? "" : "selected"} onClick={toggleSimuOrMonitor}>monitoring</div>
        </div>

        {isSimulation ? (
        <div className="input-wrapper">
          <div className="row">
            <div className="subtitle">Weather: <b>{selectedWeather}</b></div>
              <div className="weathers"> 
                <div className={selectedWeather == "sunny" ? "selected-weather" : null} onClick={sunny}>☀️</div>
                <div className={selectedWeather == "rainy" ? "selected-weather" : null} onClick={rainy}>🌧️</div>
                <div className={selectedWeather == "dusty" ? "selected-weather" : null} onClick={dusty}>💨</div>
              </div>
          </div>

          <div className="row">
            <div className="subtitle">Panel count</div>
              <div className="panel-count-control">
                <div><b>{panelCount}</b></div>
                <div className="pointer add-remove-panel" onClick={ () => addPanel(panelCount)    }> <b> + </b> </div>
                <div className="pointer add-remove-panel" onClick={ () => removePanel(panelCount) }> <b> - </b> </div>
              </div>
          </div>
        </div>
        ) : null}


        <div className={panelModal ? "right-modal right-modal-show" : "right-modal right-modal-hide"}>
          <div className="title-wrapper">
            <div className="title"><b>{selectedPanel.name}</b></div>
            <div>
              <img src={graphPng} className="pointer" onClick={openPopUpModal} alt="graph" style={{ maxWidth: '30px' }}/>
              <img src={closeIcon} className="pointer" onClick={closeModal} alt="graph" style={{ maxWidth: '30px' }}/>
            </div>
          </div>

          <div className="info-wrapper">
            <div className="subtitle">Id</div>
            <div className="info">{selectedPanel.id}</div>
          </div>

          <div className="info-wrapper">
            <div className="subtitle">Timestamp</div>
            <div className="info">{currentData.timestamp.split(" ")[1]}</div>
          </div>

          {(selectedPanel.name == "sensors") ? 
          <div>
            <div className="info-wrapper">
              <div className="subtitle">Solar Irradiation (W/m2)</div>
              <div className="info">{currentData.IRR}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">1um particulate mass (ug/m3)</div>
              <div className="info">{currentData.massaPM1}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">2.5um particulate mass (ug/m3)</div>
              <div className="info">{currentData.massaPM2}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">4um particulate mass (ug/m3)</div>
              <div className="info">{currentData.massaPM4}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">10um particulate mass (ug/m3)</div>
              <div className="info">{currentData.massaPM10}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">1um particulate concentration (#/m3)</div>
              <div className="info">{currentData.numPM1}</div>
            </div>
            <div className="info-wrapper">
              <div className="subtitle">2.5um particulate concentration (#/m3)</div>
              <div className="info">{currentData.numPM2}</div>
            </div>
            <div className="info-wrapper">
              <div className="subtitle">4um particulate concentration (#/m3)</div>
              <div className="info">{currentData.numPM4}</div>
            </div>
            <div className="info-wrapper">
              <div className="subtitle">10um particulate concentration (#/m3)</div>
              <div className="info">{currentData.numPM10}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Average particulate concentration</div>
              <div className="info">{currentData.tamanho_medio}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Environment temperature (celsius)</div>
              <div className="info">{currentData.temp}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">wind direction (angles)</div>
              <div className="info">{currentData.vento_dir}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Wind speed (meters/second)</div>
              <div className="info">{currentData.vento_vel}</div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Rain precipitation</div>
              <div className="info">{currentData.rainfall}</div>
            </div>
          </div> 
          
          : 
          
          <div>
            <div className="info-wrapper">
              <div className="subtitle">Alternate power (W) {isSimulation == false && selectedPanel.name == "solar panel 6" ? "⚠️" : null}</div>
              {(isSimulation == true) ?  
              <div className="info"> {selectedPanel && selectedPanel.name ? currentData["P_AC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>
              :<div className="info"> {selectedPanel && selectedPanel.name ? currentData["P_AC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>}
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Alternate current (A)</div>
              <div className="info"> {selectedPanel && selectedPanel.name ? currentData["I_AC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Direct current (A)</div>
              <div className="info"> {selectedPanel && selectedPanel.name ? currentData["I_DC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Alternate voltage (V)</div>
              <div className="info"> {selectedPanel && selectedPanel.name ? currentData["V_AC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>
            </div>

            <div className="info-wrapper">
              <div className="subtitle">Direct voltage (V)</div>
              <div className="info"> {selectedPanel && selectedPanel.name ? currentData["V_DC_Group" + selectedPanel.name.split(" ")[2]] : "No panel selected"} </div>
            </div>
          </div>
          
          }
        </div>
      </div>

      {/* pop up modal */}
      <Modal isOpen={popupPanelModal} close={closePopUpModal}> 
        <img src={displayGraphPng} alt="" />
      </Modal>
    </div>
  );
};

export default DigitalTwin;
