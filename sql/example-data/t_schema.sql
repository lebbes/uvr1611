/*
-- Query: SELECT * FROM uvr1611.t_schema
LIMIT 0, 1000

-- Date: 2013-03-31 17:20
*/
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (1,'#speicher1_oben > tspan','frame1','analog1','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (2,'#speicher1_unten > tspan','frame1','analog2','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (3,'#speicher2_oben > tspan','frame1','analog3','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (4,'#speicher2_unten > tspan','frame1','analog4','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (5,'#innen_temp > tspan','frame1','analog5','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (6,'#aussen_temp > tspan','frame1','analog6','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (7,'#vl1_temp > tspan','frame1','analog7','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (8,'#vl2_temp > tspan','frame1','analog8','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (9,'#rl3_temp > tspan','frame1','analog9','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (10,'#kessel_temp > tspan','frame1','analog12','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (11,'#roehren_temp > tspan','frame1','analog15','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (12,'#flach_temp > tspan','frame1','analog16','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (13,'#solarrl_temp > tspan','frame1','analog14','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (14,'#solarvl_temp > tspan','frame1','analog13','#.# °C');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (15,'#fb_pump > tspan','frame1','digital2','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (16,'#hz_pump > tspan','frame1','digital1','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (17,'#ww_pump > tspan','frame1','digital6','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (18,'#flach_pumpe > tspan','frame1','digital11','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (19,'#roehren_pumpe > tspan','frame1','digital10','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (20,'#lade_pumpe > tspan','frame1','digital7','DIGITAL(#)');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (21,'#flach_info > tspan:eq(1)','frame1','energy1','Gesamt: MWH(#) MWh KWH(#.#) kWh');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (22,'#flach_info > tspan:eq(2)','frame1','power1','Aktuell: #.### kW');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (23,'#roehren_info > tspan:eq(1)','frame1','energy2','Gesamt: MWH(#) MWh KWH(#.#) kWh');
INSERT INTO `t_schema` (`id`,`path`,`frame`,`type`,`format`) VALUES (24,'#roehren_info > tspan:eq(2)','frame1','power2','Aktuell: #.### kW');
