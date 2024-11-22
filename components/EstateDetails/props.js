export default {
  estate: {
    type: Object,
    required: true,
    default () {
      return {
        advertiseOn: {
          homepage: true,
          firstPublishingDateOnHomepage: '2023-01-10T00:16:58',
          showAsComming: false,
          showAsSoonForSale: false,
          showTodaysHousing: false,
          hidePrice: false,
          hideAddress: false,
          showInImageLoop: false,
          showAsReferenceHousing: false,
          changingRequirementsText: null,
          imageIds: [],
          documents: [],
          links: [],
          marketplaces: [],
          showAsPreview: false
        },
        baseInformation: {
          newConstruction: false,
          livingSpace: 0,
          otherSpace: 0,
          apartmentNumber: null,
          apartmentNumberRegistration: '0',
          monthlyFee: 0,
          monthlyFeeIsZero: false,
          includedInFee: null,
          commentary: 'Loading',
          disposalForm: 'BR',
          tenure: 'Bostadsrätt',
          increaseSeekConception: [],
          objectAddress: {
            municipality: 'Solna',
            area: '',
            coordinate: {
              longitud: 18.014013,
              latitud: 59.36135
            },
            countyMunicipalityParishCode: '018400',
            districtCode: '',
            district: null,
            localIncomeTax: '29,708',
            parish: null,
            county: 'Stockholms',
            areaId: null,
            areaArchived: true,
            streetAddress: 'Virebergsvägen 20',
            zipCode: '16930',
            city: 'SOLNA',
            countryCode: 'SE'
          },
          areaSource: null,
          areaSourceComment: null,
          other: null,
          projectId: null,
          sensitiveBusiness: false,
          propertyType: 'Bostadsrätt'
        },
        interior: {
          kitchenType: null,
          numberOfBedroom: null,
          maxNumberOfBedroom: null,
          numberOfRooms: 3,
          generealDescription: '',
          compiledDescription: false,
          rooms: null
        },
        building: {
          buildingType: 'Flerbostadshus',
          buildingYear: '1972',
          commentaryForBuildingYear: null,
          heating: null,
          windows: null,
          otherAboutTheBuildning: null,
          otherBuildings: null,
          propertyUnitDesignation: '',
          renovations: null
        },
        ventilation: {
          type: '',
          inspection: ''
        },
        energyDeclaration: {
          completed: 'Performed',
          energyDeclarationDate: '2018-10-03T23:52:33',
          energyConsumption: '',
          energyClass: 'D',
          primaryEnergyNumber: '105'
        },
        groundIncludetToHousingCooperative: {
          squereMetre: '',
          description: null
        },
        floorAndElevator: {
          descriptionOfElevator: null,
          elevator: 'no',
          totalNumberFloors: 3,
          totalNumberOfFloors: 3,
          floor: 1,
          floorCommentary: null
        },
        price: {
          startingPrice: 0,
          finalPrice: 0,
          priceInOtherCurrencie: 0,
          otherCurrency: '',
          text: ''
        },
        date: {
          possibleAccessDate: null,
          accessDate: null,
          accessTime: null,
          agreementDate: null,
          assignmentDate: '2023-01-10T00:16:57',
          allTermsMettDate: null
        },
        participationAndRepairFund: {
          repairFund: 0,
          participationOffAnnualFee: 0,
          participationInAssociation: 0.2245,
          shareComment: null,
          indirectNetDebt: null,
          indirectNetDebtComment: null
        },
        association: {
          id: 'ORGBRFF7F07CE1895C465EB2E87559849667B4',
          associationChangedAt: '2023-03-20T17:51:25',
          overridenDescriptions: null,
          overridenEconomy: null,
          name: 'Hsb:s BRF Blåkulla Nr 248 I Solna',
          organizationalForm: 'Bostadsratt',
          corporateNumber: '716417-8068',
          streetAddress: 'Hagalundsgatan 30',
          zipCode: '16964',
          city: 'SOLNA',
          email: {
            emailAddress: null,
            emailAddress2: null
          },
          homePage: null,
          genuineAssociation: true,
          publicContact: null,
          phonePublicContact: null,
          applicationEntranceResignation: null,
          responsibleApartmentRegister: null,
          generalAboutAssociation: 'Loading',
          noteAboutHousingCooperative: null,
          notes: null,
          finances: null,
          theAssociationOwnTheGround: 'Ja',
          numberOfApartments: 442,
          numberOfRentalUnits: 28,
          numberOfLocals: 27,
          renovations: null,
          parking: null,
          tvAndBroadband: null,
          transferFee: 1190,
          pledgeFee: 476,
          allowLegalPersonAsBuyer: 'Nej',
          allowTwinOwnership: 'Ja',
          transferFeePaidBy: 'Säljare',
          courtyard: null,
          other: null,
          sharedSpaces: null,
          documents: [],
          monthlyFeeinfinformation: null,
          images: [],
          insurance: null,
          buildingYear: '1972',
          commentaryForBuildingYear: null,
          sublettingPolicy: null
        },
        inspection: {
          inspected: false,
          sellerInsurence: false
        },
        predge: {
          pawned: false,
          taskControlled: null,
          notes: null
        },
        operation: {
          heating: 0,
          electricity: 0,
          waterAndDrain: 0,
          chimneySweeping: 0,
          roadCommunity: 0,
          sanitation: 0,
          insurance: 0,
          other: 0,
          sum: 0,
          personsInTheHousehold: 0,
          commentary: null,
          roadCharge: 0,
          maintenance: 0
        },
        electricity: {
          companie: '',
          distributor: '',
          powerConsumptionKWH: 0
        },
        bids: [],
        viewingSettings: {
          showOneViewingTimeOnInternet: false,
          missingViewingTimeDescription: null
        },
        viewings: [],
        marketedAs: 'Apartment',
        balconyPatio: {
          squereMeterype: null,
          type: null,
          summary: null,
          parking: null,
          balcony: true,
          patio: null,
          parkingLot: null
        },
        commissionType: 'Sale',
        tvAndBroadband: {
          tv: null,
          broadband: null
        },
        surrounding: null,
        buyers: [],
        internetSettings: {
          bidSetting: 'DontShowBidding',
          isVerifiedBidding: false
        },
        webbId: null,
        estateId: 'OBJ19854_1974806122',
        customerId: 'M19854',
        officeId: 'FIR19854',
        dateChanged: '2023-03-24T09:26:48',
        assignment: {
          status: {
            id: '3',
            name: 'Till salu'
          },
          marketingMethods: null,
          responsibleBroker: 'HAN1A29280EBA944CEF8C87E156DE6C7BBB',
          additionalContact: null,
          producer: null
        },
        description: {
          sellPhrase: '',
          generally: null,
          sellingHeading: '',
          shortSellingDescription: 'Loading',
          longSellingDescription: '',
          wayDescription: '',
          language: 'SV',
          other: null
        },
        images: [
          {
            category: '',
            supplier: '',
            supplierId: '',
            text: null,
            name: null,
            textExtended: null,
            orderNumber: 1,
            hemnetOrderNumber: 1,
            imageId: 'placeholder-home',
            dateChanged: '2023-03-17T13:28:26',
            dateChangedImageData: '2023-03-17T13:22:53',
            url: 'https://connect.maklare.vitec.net:443/image/GetImage?customerId=M19854&imageId=MEDC0A13A8BF06E4FCCB9DE79EE6057A275',
            showImageOnInternet: true,
            extension: 'png',
            cdnReferences: [
              'estate-images/placeholder-home.png'
            ]
          }
        ],
        interests: [],
        customFields: [],
        files: [],
        broker: {
          archived: false,
          public: true,
          userId: 'HAN1A29280EBA944CEF8C87E156DE6C7BBB',
          customerId: [
            'M19854'
          ],
          orderNumber: 1,
          userName: 'Gabriel Youhanoun',
          department: null,
          category: null,
          title: 'GRUNDARE/FASTIGHETSMÄKLARE',
          extraTitle: null,
          allowLogOn: true,
          emailAddress: 'gabriel@sthlmestate.se',
          telePhone: null,
          cellPhone: '073-73 900 01',
          directPhonenumbers: [
            {
              customerId: 'M19854',
              phonenumber: null
            }
          ],
          publicPhonenumber: '0737390001',
          spokenLanguages: [],
          bank: 'SEB',
          cleringNumber: null,
          account: '5385 11 513 48',
          iban: null,
          swift: null,
          comment: null,
          image: {
            imageId: 'MED96B855AA090C4396A807B405086E6DDE',
            dateChanged: '2022-11-07T16:12:32',
            dateChangedImageData: '2022-11-07T16:12:32',
            url: 'https://connect.maklare.vitec.net/Image/GetImage?customerId=M19854&imageId=MED96B855AA090C4396A807B405086E6DDE',
            showImageOnInternet: true,
            extension: 'png',
            cdnReferences: [
              'estate-images/OBJ19854_1974806122/HAN1A29280EBA944CEF8C87E156DE6C7BBB/MED96B855AA090C4396A807B405086E6DDE.png'
            ]
          },
          publishedOnOffice: [
            'M19854'
          ],
          internalEmployeeNumber: null,
          externalUserId: null,
          customerIdsWithSortOrder: [
            {
              customerId: 'M19854',
              orderNumber: 1936293773,
              mainBusiness: true,
              officeId: 'FIR19854'
            }
          ],
          dateChanged: '2022-12-21T16:03:52',
          subOffices: [],
          reviews: []
        },
        mainImageUrl: 'https://sthlmestate.se/placeholder-home.png'
      }
    }
  }
}
