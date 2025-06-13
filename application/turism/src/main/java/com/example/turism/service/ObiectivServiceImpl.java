package com.example.turism.service;

import com.example.turism.model.Obiectiv;
import com.example.turism.repository.ObiectivRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ObiectivServiceImpl implements ObiectivService{
    @Autowired
    private ObiectivRepository obiectivRepository;

    @Override
    public Obiectiv saveObiectiv(Obiectiv obiectiv) {
        return obiectivRepository.save(obiectiv);
    }

    @Override
    public List<Obiectiv> getAllObiective() {
        return obiectivRepository.findAll();
    }

    @Override
    public List<Obiectiv> getAllObiectiveFiltered(String categorie) {
        return obiectivRepository.findAllByCategorie(categorie);
    }

    public List<Obiectiv> getAllObiectiveFiltered2(List<String> categorii) {
        if (categorii == null || categorii.isEmpty()) {
            return obiectivRepository.findAll();
        } else {
            return obiectivRepository.findAllByCategorieIn(categorii);
        }
    }

    @Override
    public List<Obiectiv> getAllObiectiveFilteredByOras(String oras) {
        return obiectivRepository.findAllByOras(oras);
    }

    @Override
    public List<Obiectiv> getItinerariu(String oras, int oraStart, int oraEnd, int pretMaxim) {
        List<Obiectiv> itinerariu = new ArrayList<>();
        Set<Integer> obiectiveSelectate = new HashSet<>();
        Random random = new Random();
        int pretTotal = 0;

        while (oraStart <= oraEnd && pretTotal <= pretMaxim) {
            int finalOraStart = oraStart;
            List<Obiectiv> obiectiveDisponibile = obiectivRepository.findAllByOras(oras).stream()
                    .filter(obiectiv -> !obiectiveSelectate.contains(obiectiv.getId()))
                    .filter(obiectiv -> finalOraStart >= obiectiv.getOra_deschidere() && finalOraStart < obiectiv.getOra_inchidere())
                    .collect(Collectors.toList());

            if (!obiectiveDisponibile.isEmpty()) {
                Obiectiv obiectiv = obiectiveDisponibile.get(random.nextInt(obiectiveDisponibile.size()));
                int timpDisponibilPanaLaInchidere = obiectiv.getOra_inchidere() - oraStart;

                if (oraStart >= obiectiv.getOra_deschidere() &&
                        oraStart < obiectiv.getOra_inchidere() &&
                        obiectiv.getTimp() <= timpDisponibilPanaLaInchidere &&
                        (pretTotal + obiectiv.getPret() <= pretMaxim)) {
                    if (oraStart + obiectiv.getTimp() <= oraEnd) {
                        obiectiv.setOra_propusa(oraStart);
                        itinerariu.add(obiectiv);
                        obiectiveSelectate.add(obiectiv.getId());
                        oraStart += obiectiv.getTimp() + 1;
                        pretTotal += obiectiv.getPret();
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }

        return itinerariu;
    }

    @Override
    public List<Obiectiv> getItinerariu2(String oras, int oraStart, int pauza, int oraEnd, int pretMaxim) {
        List<Obiectiv> itinerariu = new ArrayList<>();
        Set<Integer> obiectiveSelectate = new HashSet<>();
        Random random = new Random();
        int pretTotal = 0;

        while (oraStart <= oraEnd && pretTotal <= pretMaxim) {
            int finalOraStart = oraStart;
            List<Obiectiv> obiectiveDisponibile = obiectivRepository.findAllByOras(oras).stream()
                    .filter(obiectiv -> !obiectiveSelectate.contains(obiectiv.getId()))
                    .filter(obiectiv -> finalOraStart >= obiectiv.getOra_deschidere() && finalOraStart < obiectiv.getOra_inchidere())
                    .collect(Collectors.toList());

            if (!obiectiveDisponibile.isEmpty()) {
                Obiectiv obiectiv = obiectiveDisponibile.get(random.nextInt(obiectiveDisponibile.size()));
                int timpDisponibilPanaLaInchidere = obiectiv.getOra_inchidere() - oraStart;

                if (oraStart >= obiectiv.getOra_deschidere() &&
                        oraStart < obiectiv.getOra_inchidere() &&
                        obiectiv.getTimp() <= timpDisponibilPanaLaInchidere &&
                        (pretTotal + obiectiv.getPret() <= pretMaxim)) {
                    int oraSfarsitVizita = oraStart + obiectiv.getTimp();

                    if (oraStart <= pauza && oraSfarsitVizita > pauza) {
                        oraStart = pauza + 1;
                        oraSfarsitVizita = oraStart + obiectiv.getTimp();
                    }

                    timpDisponibilPanaLaInchidere = obiectiv.getOra_inchidere() - oraStart;
                    if (oraSfarsitVizita <= obiectiv.getOra_inchidere() && oraSfarsitVizita <= oraEnd) {
                        obiectiv.setOra_propusa(oraStart);
                        itinerariu.add(obiectiv);
                        obiectiveSelectate.add(obiectiv.getId());
                        oraStart = oraSfarsitVizita + 1;
                        pretTotal += obiectiv.getPret();
                    }
                }
            } else {
                break;
            }
        }

        return itinerariu;
    }

    public List<List<Obiectiv>> getItinerariuCuZile(String oras, int oraStart, int pauza, int oraEnd, int pretMaxim, int zile) {
        List<List<Obiectiv>> itinerariiPeZile = new ArrayList<>();
        List<Obiectiv> obiectiveDisponibile = obiectivRepository.findAllByOras(oras);

        for (int zi = 0; zi < zile && !obiectiveDisponibile.isEmpty(); zi++) {
            List<Obiectiv> itinerariu = new ArrayList<>();
            Set<Integer> obiectiveSelectate = new HashSet<>();
            int pretTotal = 0;
            int currentHour = oraStart;

            while (currentHour <= oraEnd && pretTotal <= pretMaxim) {
                int finalCurrentHour = currentHour;
                int finalPretTotal = pretTotal;
                obiectiveDisponibile = obiectivRepository.findAllByOras(oras).stream()
                        .filter(obiectiv -> !obiectiveSelectate.contains(obiectiv.getId()) &&
                                finalCurrentHour >= obiectiv.getOra_deschidere() &&
                                finalCurrentHour + obiectiv.getTimp() <= obiectiv.getOra_inchidere() &&
                                finalPretTotal + obiectiv.getPret() <= pretMaxim)
                        .sorted(Comparator.comparingInt(Obiectiv::getOra_propusa))
                        .collect(Collectors.toList());

                if (!obiectiveDisponibile.isEmpty()) {
                    Obiectiv obiectiv = obiectiveDisponibile.get(0);
                    int oraSfarsitVizita = currentHour + obiectiv.getTimp();
                    if (currentHour <= pauza && oraSfarsitVizita > pauza) {
                        currentHour = pauza + 1;
                        continue;
                    }
                    if (currentHour + obiectiv.getTimp() <= oraEnd) {
                        obiectiv.setOra_propusa(currentHour);
                        itinerariu.add(obiectiv);
                        obiectiveSelectate.add(obiectiv.getId());
                        currentHour = oraSfarsitVizita + 1;
                        pretTotal += obiectiv.getPret();
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            itinerariiPeZile.add(itinerariu);
        }
        return itinerariiPeZile;
    }

    public List<List<Obiectiv>> getItinerariuCuZile2(String oras, int oraStart, int oraEnd, int pretMaxim, int zile) {
        List<List<Obiectiv>> itinerariiPeZile = new ArrayList<>();
        List<Obiectiv> obiectiveDisponibile = obiectivRepository.findAllByOras(oras);

        for (int zi = 0; zi < zile && !obiectiveDisponibile.isEmpty(); zi++) {
            List<Obiectiv> itinerariu = new ArrayList<>();
            Set<Integer> obiectiveSelectate = new HashSet<>();
            int pretTotal = 0;
            int currentHour = oraStart;

            while (currentHour <= oraEnd && pretTotal <= pretMaxim) {
                int finalCurrentHour = currentHour;
                int finalPretTotal = pretTotal;
                obiectiveDisponibile = obiectivRepository.findAllByOras(oras).stream()
                        .filter(obiectiv -> !obiectiveSelectate.contains(obiectiv.getId()) &&
                                finalCurrentHour >= obiectiv.getOra_deschidere() &&
                                finalCurrentHour + obiectiv.getTimp() <= obiectiv.getOra_inchidere() &&
                                finalPretTotal + obiectiv.getPret() <= pretMaxim)
                        .sorted(Comparator.comparingInt(Obiectiv::getOra_propusa))
                        .collect(Collectors.toList());

                if (!obiectiveDisponibile.isEmpty()) {
                    Obiectiv obiectiv = obiectiveDisponibile.get(0);
                    if (currentHour >= obiectiv.getOra_deschidere() &&
                            (pretTotal + obiectiv.getPret() <= pretMaxim)) {
                        int oraSfarsitVizita = currentHour + obiectiv.getTimp();
                        if (oraSfarsitVizita <= oraEnd) {
                            obiectiv.setOra_propusa(currentHour);
                            itinerariu.add(obiectiv);
                            obiectiveSelectate.add(obiectiv.getId());
                            currentHour = oraSfarsitVizita + 1;
                            pretTotal += obiectiv.getPret();
                        } else {
                            break;
                        }
                    }
                } else {
                    break;
                }
            }

            itinerariiPeZile.add(itinerariu);
        }
        return itinerariiPeZile;
    }

    @Override
    public void deleteObiectivById(int id) {
        obiectivRepository.deleteById(id);
    }
}
